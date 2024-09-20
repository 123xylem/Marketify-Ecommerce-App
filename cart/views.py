from django.shortcuts import get_object_or_404, redirect
from product.models import *
from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework.response import Response
from product.serializers import ProductSerializer
class CartViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

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

