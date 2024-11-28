from django.shortcuts import get_object_or_404, redirect, render
from product.models import *
from django.contrib.auth.mixins import LoginRequiredMixin

from rest_framework.response import Response
from rest_framework import viewsets, status
from .serializers import CartSerializer, CartItemSerializer
from product.serializers import ProductSerializer
from .models import Cart, CartItem
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
      permission_classes = [IsAuthenticated]
      def get_queryset(self):
        return Cart.objects.filter(user=self.request.user)
      
      def get_cart(self):
        cart, created = Cart.objects.get_or_create(user=self.request.user)
        return cart


      def create(self, request, *args, **kwargs):
          cart = self.get_cart()
          product_id = self.request.data.get('product_id')
          buy_now = self.request.data.get('buy_now')
          cart.add_product(product_id)
          if buy_now:
             cart.buy_product_now(product_id)

          cart.save()
          return Response({'data': f'{self.serializer_class(cart).data} Created or something'})
  
      def list(self, request):
          cart = self.get_cart()
          cart_products = cart.cartitem_set.all()
          serializer = CartItemSerializer(cart_products, many=True).data
          return Response({'cart': serializer})


      def update(self, request, pk=None):
        cart = self.get_cart()
        serializer = self.get_serializer(cart)
        return Response({
          'data': serializer.data
        })
      
      def destroy(self, request, *args, **kwargs):
        cart = self.get_cart()
        cart.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
      
      @action(detail=False, url_path='remove/(?P<pk>[^/.]+)', methods=['post'])
      def remove_product(self, request, pk=None):
          cart = self.get_cart()
          cart_item = CartItem.objects.filter(cart=cart, product=pk).first()

          if cart_item.quantity > 1:
             cart_item.quantity -= 1
             cart_item.save()
          else:
            cart_item.delete()
          cart_products = cart.cartitem_set.all().order_by('id')
          serializer = CartItemSerializer(cart_products, many=True).data
          return Response({'cart': serializer}, status=status.HTTP_200_OK)
     
      @action(detail=False, url_path='add/(?P<pk>[^/.]+)', methods=['post'])
      def add_product(self, request, pk=None):
          cart = self.get_cart()
          product = Product.objects.filter(id=pk).first()
          cart_page_action = request.GET.get('cart-update')
          buy_now_action = 'buy_now' in request.data and request.data['buy_now']
          cart_product, created = CartItem.objects.get_or_create(cart=cart, product=product)
          if created:
            if buy_now_action:
              print('REDIRECT TO CART')
              return Response(data={'redirect_url': '/api/cart/frontend/cart', 'message': 'Redirecting to cart'}, status=status.HTTP_200_OK)
            print('JUST Added')

            return Response({'status': 'product added to cart'}, status=status.HTTP_200_OK)
          


          cart_item = cart_product
          print( 'NOT CREATED', cart_item)
          print(cart_item.quantity, cart.cartitem_set.all())
          cart_item.quantity += 1
          cart_item.save()
          cart_products = cart.cartitem_set.all().order_by('id')
          serializer = CartItemSerializer(cart_products, many=True).data
          
          if buy_now_action:
            print('REDIRECT TO CART')
            return Response(data={'redirect_url': '/api/cart/frontend/cart', 'message': 'Redirecting to cart'}, status=status.HTTP_200_OK)

          if cart_page_action:
            return Response({'cart': serializer}, status=status.HTTP_200_OK)
          
          return Response({'status': 'product added to cart'}, status=status.HTTP_200_OK)


      @action(detail=False, url_path='checkout', methods=['post'])
      def checkout(self, request, pk=None):
          print('CHECKING OUT!!!!!!!!!!!!!!!!!!!')
          cart = self.get_cart()
          if not cart.products_list.all():
            return Response(data={'data': 'No products in cart'}, content_type='application/json', status=status.HTTP_400_BAD_REQUEST)
          order = cart.make_order(request)
          cart.clear_products_list()
          print(order, 'order DATA')
          return render(request, 'order/order.html', {'order_data': order, 'order_id': order.id, 'user': request.user})

def cart_viewer(request):
  cart, created = Cart.objects.get_or_create(user=request.user)
  products = cart.products_list.all()
  return render(request, 'cart/cart.html', {'products': products, 'user': request.user})


def add_to_cart(request, id):
  #create and/or add product id to cart
  print('here?')
  product = get_object_or_404(Product, id=id)

  print(id, product)
  return Response(product)

def remove_from_cart(request, id):
  #Remove product id from cart
  pass


# %%
