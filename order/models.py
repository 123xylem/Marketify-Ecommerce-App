from django.db import models
from account.models import AccountProfile
from product.models import Product
# Create your models here.


class Order(models.Model):
  user = models.ForeignKey(AccountProfile, on_delete=models.CASCADE)
  created_at = models.DateTimeField(auto_now_add=True)
  status = models.BooleanField(default='False', choices=[(False, 'Incomplete'), (True, 'Completed')])
  # def __str__(self):
  #   return self.user.user
  
class OrderProduct(models.Model):
  product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='products_in_order')
  order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='order_product')
  quantity = models.IntegerField(default=1)
  class Meta:
      unique_together = ('order', 'product')
