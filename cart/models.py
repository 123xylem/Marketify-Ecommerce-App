from django.db import models
from django.conf import settings
from product.models import Product
from account.models import AccountProfile

# Create your models here.
class Cart(models.Model):
  user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
  product_list = models.ManyToManyField(Product, related_name='cart_products')

  def delete(self, *args, **kwargs):
    print('DELETING: ', self.product_list)
    self.product_list.clear()
    super().delete(*args, **kwargs)

  def clear_product_list(self):
        print('DELETING: ', self.product_list)

        self.product_list.clear()

  def add_product(self, product_id):
    if not self.product_list.filter(id=product_id).exists():
      self.product_list.add(product_id)
    return self.product_list.all()

  def buy_product_now(self, product_id):
    print('Buying Products!: ', Product.objects.get(id=product_id))

  def make_order(self):
     pass