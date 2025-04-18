from django.shortcuts import render, get_object_or_404, redirect
from django.http import JsonResponse, HttpResponse
from .models import Order, OrderProduct
from .serializers import OrderSerializer, OrderProductSerializer
from rest_framework import viewsets
from rest_framework.response import Response
from drf_spectacular.utils import extend_schema
from product.serializers import ProductSerializer
from product.models import Product
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from rest_framework.decorators import permission_classes, api_view
from django.views import View
import stripe
import json
from accountprofile.models import CustomAccountProfile
from cart.models import Cart
from django.core.paginator import Paginator
from decouple import config
from rest_framework.pagination import PageNumberPagination

STRIPE_SK = config('STRIPE_SK')
BACKEND_DOMAIN = config('BACKEND_DOMAIN')
FRONTEND_DOMAIN = config('FRONTEND_DOMAIN')
stripe.api_key = STRIPE_SK
YOUR_DOMAIN = BACKEND_DOMAIN

@extend_schema(responses=OrderSerializer)
class OrderViewSet(viewsets.ModelViewSet):
  queryset = Order.objects.all()
  serializer_class = OrderSerializer
  permission_classes = [IsAuthenticated]
  def create(self, request, *args, **kwargs):
      order = Order.objects.create(user=request.user)
      print(request.data['prodIds'], request.user)
      for product in request.data['prodIds']:
        a_product = Product.objects.get(id=product['id'])
        orderProduct = OrderProduct.objects.create(product=a_product, order=order,quantity=product['quantity'] )
        orderProduct.save()
      order.save()

      return Response({'order': self.serializer_class(order).data} )
  
  def retrieve(self, request, pk=None):
      print('RETRIECE')
      queryset = Order.objects.all()
      order = get_object_or_404(queryset, pk=pk)
      serializer = OrderSerializer(order).data
      products = OrderProduct.objects.filter(order=order)
      products_list = []
      for prod in products:
         products_list.append(prod.product)

      product_data = ProductSerializer(products_list, many=True).data
      # print(serializer, product_data)
      return Response({'order_data': serializer, 'product_data': product_data, 'user': request.user})

  def list(self, request):
      print('LIST ORDERS ')
      user = request.user
      queryset = Order.objects.filter(user=user).order_by('-created_at')

      if request.GET.get('limit'):
        limit = int(request.GET.get('limit'))
        queryset = Order.objects.filter(user=user).order_by('-created_at')[:limit]
      page = self.paginate_queryset(queryset)

      if page is not None:
          serializer = self.get_serializer(page, many=True)
          # print(serializer.data)
          return self.get_paginated_response(serializer.data)
      return Response(serializer.data)
 
  @action(detail=True, url_path='view_order', methods=['get'])
  def view_order(self, request, *args):
      order = Order.objects.get(id=pk)
      products = order.products_list.all()
      product_data = []
      product_data = ProductSerializer(products, many=True).data
      serializer = self.get_serializer(order).data
      return render(request, 'order/order.html', {'order_data': serializer, 'products': product_data, 'user': request.user})
#STRIPE PAYMENT WATCH MUST BE ON TO CREATE ORDER
#stripe listen --events payment_intent.created,customer.created,payment_intent.succeeded,charge.succeeded,checkout.session.completed,charge.failed \
  # --forward-to localhost:8000/api/order

@extend_schema(responses=OrderSerializer)
class OrderProductViewSet(viewsets.ModelViewSet):
  queryset = OrderProduct.objects.all()
  serializer_class = OrderProductSerializer
  permission_classes = [IsAuthenticated]
  def create(self, request, *args, **kwargs):

      print('orderProds!!!!!!', request.data)
      prods = []
      for product in args:
        orderProduct = OrderProduct.objects.create(product=product.id, order=product.order,quantity=product.quantity )
        orderProduct.save()
        prods.append(orderProduct)
      return Response({'data': f'{prods} Order products Created'})


@extend_schema(summary='Stripe initiate checkout',  description='Stripe endpoint hit by frontend initiate checkout')
@csrf_exempt
@permission_classes([IsAuthenticated])
@api_view(['POST'])
def CreateCheckoutSession(request):       
      try:
          verification_session = stripe.identity.VerificationSession.create(
            type="document",
            provided_details={
              "email": request.user.email
            },
            metadata={
              "user_id": request.user.id,
            },
          )
          # Return only the client secret to the frontend.
          client_secret = verification_session.client_secret
          cart = json.loads(request.body)
          cart_items = []
          for item in cart['cartItems']:
            print('ITEM:', (item['title']), item['id'])
            cart_items.append({
                'price_data': {
                'currency': 'usd', 
                'product_data': {'name': item['title']},
                'unit_amount': int(float(item['price']) * 100) , 
              },
              'quantity' : item['quantity']}
            ) 
          payment_intent_data = {
             'metadata': {
                "user_id": request.user.id,  
                "user_email": request.user.email,
                "username": request.user
              }
          }

          session = stripe.checkout.Session.create(
              payment_method_types=['card'],
              line_items = cart_items,
              mode='payment',
              success_url=FRONTEND_DOMAIN + '/checkout?success&session_id={CHECKOUT_SESSION_ID}',
              cancel_url=FRONTEND_DOMAIN + '/checkout?cancel',
              payment_intent_data=payment_intent_data
          )
          # print(session, 'SESSIONNNN')
          return JsonResponse({'id': session.id, 'clientSecret': client_secret})
      except Exception as e:
          return JsonResponse({'error': str(e)}, status=500)

@method_decorator(csrf_exempt, name='dispatch')
class SessionStatus(View):
    def get(self, request):
        session_id = request.GET.get('session_id')
        session = stripe.checkout.Session.retrieve(session_id)
        return JsonResponse({
            'status': session.status,
            'customer_email': session.customer_email
        })

#Hit by webhook on payment event - Creates the order/Cart and assigns to user on succeful payment
@csrf_exempt
def payment_handler(request):
  payload = request.body
  event = None

  try:
    event = stripe.Event.construct_from(
      json.loads(payload), stripe.api_key
    )
  except ValueError as e:
    # Invalid payload
    return HttpResponse(status=400)

  # Handle the event
  if event.type == 'payment_intent.succeeded':
    payment_intent = event.data.object 
    # print( payment_intent.metadata)
    curr_user = CustomAccountProfile.objects.get(email=payment_intent.metadata['user_email'])
    cart = Cart.objects.get(user=payment_intent.metadata['user_id'])
    order = Order.objects.create(user=curr_user)
    cart_items = cart.get_cart_items()
    print(cart_items, 'items')
    # //Create OrderProducts in the order
    for product in cart_items:
      # print(product, vars(product))
      a_product = Product.objects.filter(id=product.product.id).first()
      quantity = product.quantity
      print('FOUND PROD:', a_product, 'quan=', quantity)
      orderProduct = OrderProduct.objects.create(product=a_product, order=order, quantity=quantity  )
    order.save()
    print(order, 'SAVED order:::::::', order.order_product.all())
    cart.clear_products_list()
  else:
    print('Unhandled event type {}'.format(event.type))

  return HttpResponse(status=200)
