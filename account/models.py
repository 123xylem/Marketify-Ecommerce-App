from django.db import models

# Create your models here.
class AccountProfile(models.Model):
  username = models.CharField(max_length=50, blank=False)
  email = models.EmailField(blank=False)
