from django.shortcuts import get_object_or_404, redirect, render
from product.models import *
from django.contrib.auth.mixins import LoginRequiredMixin

from rest_framework.response import Response
from rest_framework import viewsets, status
from .serializers import CartSerializer
from product.serializers import ProductSerializer
from .models import Cart
import pprint
from drf_spectacular.utils import extend_schema
from django.contrib.auth.decorators import login_required
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import action
@extend_schema(responses=CartSerializer)
class CartViewSet(viewsets.ModelViewSet):
      serializer_class = CartSerializer
      queryset = Cart.objects.all()
      # print(serializer_class, queryset)
      permission_classes = [AllowAny]
      def get_queryset(self):
        # print(vars(self.request.user), '=========')
        # # print(self.request.__dict__)
        return Cart.objects.filter(user=self.request.user)
      
      def get_cart(self):
        cart, created = Cart.objects.get_or_create(user=self.request.user)
        return cart


      def create(self, request, *args, **kwargs):
          cart = self.get_cart()
          product_id = self.request.data.get('product_id')
          buy_now = self.request.data.get('buy_now')
          product = get_object_or_404(Product, id=product_id)
          cart.add_product(product_id)
          if buy_now:
             cart.buy_product_now(product_id)

          cart.save()
          return Response({'data': f'{self.serializer_class(cart).data} Created or something'})
  
      def list(self, request):
          cart = self.get_cart()
          products = cart.product_list.all()
          product_data = []
          product_data = ProductSerializer(products, many=True).data
          serializer = self.get_serializer(cart).data
          return Response({'cart': serializer,
                           'products': product_data})


      def update(self, request, pk=None):
        cart = self.get_cart()
        serializer = self.get_serializer(cart)
        print(request, 'update????????????????????')

        return Response({
          'data': serializer.data
        })
      
      def destroy(self, request, *args, **kwargs):
        cart = self.get_cart()
        cart.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
      

      @action(detail=False, url_path='remove_product/(?P<pk>[^/.]+)', methods=['post'])
      def remove_product(self, request, pk=None):
          print('aa', request)
          cart = self.get_cart()
          print(pk, cart, Product.objects.get(id=pk))
          product = get_object_or_404(Product, id=pk)
          cart.product_list.remove(product)
          return Response({'status': 'product removed'}, status=status.HTTP_200_OK)
     
      @action(detail=False, url_path='add_product/(?P<pk>[^/.]+)', methods=['post'])
      def add_product(self, request, pk=None):
          cart = self.get_cart()
          product = get_object_or_404(Product, id=pk)
          # TODO: Quantity Logic on duplicate
          cart.product_list.add(product)
          if 'buy_now' in request.data and request.data['buy_now']:
            #  cart.make_order(request)
            print('REDIRECT TO CART')
            return Response(data={'redirect_url': '/api/cart/frontend/cart', 'message': 'Redirecting to cart'}, status=status.HTTP_200_OK)

          return Response({'status': 'product addd'}, status=status.HTTP_200_OK)

      @action(detail=False, url_path='checkout', methods=['post'])
      def checkout(self, request, pk=None):
          print('CHECKING OUT!!!!!!!!!!!!!!!!!!!')
          cart = self.get_cart()
          if not cart.product_list.all():
            return Response(data={'data': 'No products in cart'}, content_type='application/json', status=status.HTTP_400_BAD_REQUEST)
          order = cart.make_order(request)
          cart.clear_product_list()
          print(order, 'order DATA')
          return render(request, 'order/order.html', {'order_data': order, 'order_id': order.id, 'user': request.user})

          return Response({'status': 'Checkout started'}, status=status.HTTP_200_OK)

def cart_viewer(request):
  print(request, 'asssadihasoiuhfaouhsfouasoiuhasfoiuhfsaoiufasouhafsoufsah iafsu ')
  cart, created = Cart.objects.get_or_create(user=request.user)
  products = cart.product_list.all()
  return render(request, 'cart/cart.html', {'products': products, 'user': request.user})


def add_to_cart(request, id):
  #create and/or add product id to cart
  product = get_object_or_404(Product, id=id)

  print(id, product)
  return Response(product)

def remove_from_cart(request, id):
  #Remove product id from cart
  pass

