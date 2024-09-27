from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomAccountProfile(AbstractUser):
    address = models.TextField(blank=True, default='100 exampleStreet USA')
    username = models.CharField(max_length=150, blank=True, null=True, unique=True)

    email = models.EmailField(unique=True)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    groups = models.ManyToManyField(
        'auth.Group',
        related_name='my_custom_user_groups', 
        blank=True,
        help_text='The groups this user belongs to.'
    )
    
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='my_custom_user_permissions', 
        blank=True,
        help_text='Specific permissions for this user.'
    )

    def __str__(self):
        return self.username

