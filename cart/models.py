from django.db import models
from django.conf import settings
from product.models import Product
from account.models import AccountProfile

# Create your models here.
class Cart(models.Model):
  user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
  product_list = models.ManyToManyField(Product)