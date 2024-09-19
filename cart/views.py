from django.shortcuts import get_object_or_404, redirect
from product.models import *


def add_to_cart(request, id):
  #create and/or add product id to cart
  product = get_object_or_404(Product, id=id)

  print(id, product)
  pass
  return product

def remove_from_cart(request, id):
  #Remove product id from cart
  pass

def checkout(request, id):
  if id:
    #Add product to cart and checkout
    pass
  else:
    # checkout cart for payment
    pass

