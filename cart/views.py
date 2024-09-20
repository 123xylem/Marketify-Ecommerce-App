from django.shortcuts import get_object_or_404, redirect
from product.models import *
from django.contrib.auth.mixins import LoginRequiredMixin

from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework.response import Response
from .serializers import CartSerializer
from .models import Cart
import pprint
from drf_spectacular.utils import extend_schema
from django.contrib.auth.decorators import login_required

@extend_schema(responses=CartSerializer)
class CartViewSet(LoginRequiredMixin, viewsets.ModelViewSet):
      serializer_class = CartSerializer
      queryset = Cart.objects.all()

      def get_queryset(self):
        print(vars(self.request.user), '=========')
        print(self.request.__dict__)

        return Cart.objects.filter(user=self.request.user)


      def retrieve(self, request, pk=None):
          # Ensure that a cart is created if it doesn't exist
          cart, created = Cart.objects.get_or_create(
              user=request.user,
              defaults={'user': request.user, 'product_list': []}  # Initialize product list
          )
          
          serializer = self.get_serializer(cart)
          return Response({'cart': serializer.data})

      def update(self, request, pk=None):
        cart = get_object_or_404(self.queryset)
        serializer = self.get_serializer(cart)
        print(request, 'update????????????????????')

        return Response({
          'data': serializer.data
        })


def add_to_cart(request, id):
  #create and/or add product id to cart
  product = get_object_or_404(Product, id=id)

  print(id, product)
  return Response(product)

def remove_from_cart(request, id):
  #Remove product id from cart
  pass

def checkout(request, id=False):
  if id:
    #Add product to cart and checkout
    print(id, 'assasasasa')
    return Response(id)
  else:
    # checkout cart for payment
    return Response(id)

