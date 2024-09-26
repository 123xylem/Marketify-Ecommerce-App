from django.db import models
from django.conf import settings
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

# Create your models here.
class AccountProfile(models.Model):
  user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
  username = models.CharField(max_length=50)
  email = models.EmailField(blank=False, default='user@info.com')
  address = models.TextField(blank=True, null=True)
  password = models.T
  def __str__(self):
    return self.user.username
  

# Make recievers to create/updatae model on Registration or update
@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        AccountProfile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.accountprofile.save()
