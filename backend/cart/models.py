from django.db import models
from django.shortcuts import render
from django.conf import settings
from product.models import Product
from order.models import *
from order.services import OrderService

class Cart(models.Model):
  user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
  products_list = models.ManyToManyField(Product, through='CartItem')

  def delete(self, *args, **kwargs):
    print(f'Deleting product list {self.products_list.all()} before deleting cart')
    self.products_list.clear()
    super().delete(*args, **kwargs)

  def clear_products_list(self):
      print(f'Clearing product list {self.products_list.all()} before clearing cart')
      self.products_list.clear()


  def add_product(self, product_id):
    # if not self.products_list.filter(id=product_id).exists():
    self.products_list.add(product_id)
      # print(f'Adding product {product_id} to the cart' if not self.products_list.filter(id=product_id).exists() else f'Product {product_id} already in the cart')
    return self.products_list.all()

  def buy_product_now(self, product_id):
    print('Buying Products!: ', Product.objects.get(id=product_id).title)

  def make_order(self, request):
    order_service = OrderService()
    order = order_service.create_order_from_cart(self, request)
    if order and len(self.products_list.all()) > 0:
      return order

class CartItem(models.Model):
  cart = models.ForeignKey(Cart, on_delete=models.CASCADE)
  quantity = models.IntegerField(default=1)
  product = models.ForeignKey(Product, on_delete=models.CASCADE)