from django.db import models
from django.shortcuts import render
from django.conf import settings
from product.models import Product
# from account.models import AccountProfile
from order.models import *
from order.services import OrderService
# Create your models here.
class Cart(models.Model):
  user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
  product_list = models.ManyToManyField(Product, related_name='cart_products')

  def delete(self, *args, **kwargs):
    print(f'Deleting product list {self.product_list.all()} before deleting cart')
    self.product_list.clear()
    super().delete(*args, **kwargs)

  def clear_product_list(self):
      print(f'Clearing product list {self.product_list.all()} before clearing cart')
      self.product_list.clear()


  def add_product(self, product_id):
    if not self.product_list.filter(id=product_id).exists():
      self.product_list.add(product_id)
      print(f'Adding product {product_id} to the cart' if not self.product_list.filter(id=product_id).exists() else f'Product {product_id} already in the cart')

    return self.product_list.all()

  def buy_product_now(self, product_id):
    print('Buying Products!: ', Product.objects.get(id=product_id).title)

  def make_order(self, request):
    order_service = OrderService()
    print(order_service, '2222', self)
    order = order_service.create_order_from_cart(self, request)

    # currentUser = AccountProfile.objects.get(user=request.user)
    # order = Order.objects.create(user=currentUser)
    # for product in self.product_list.all():
    #   orderProduct, created = OrderProduct.objects.get_or_create(order=order, product=product)
    # print(f'Created order {order.id} for user {currentUser.user.username}')
    # print(f'Products added to order: {[product.title for product in self.product_list.all()]}')
    if order and len(self.product_list.all()) > 0:
      return order
