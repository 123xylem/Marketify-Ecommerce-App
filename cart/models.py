from django.db import models
from product.models import Product
from user.models import User

# Create your models here.
class Cart(models.Model):
  user = models.OneToOneField(User, on_delete=models.CASCADE)
  product_list = models.ManyToManyField(Product)