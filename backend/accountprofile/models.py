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

    #Helper function for html dumping fields
    def get_fields(self):
        return [(field.name, field.value_to_string(self)) for field in CustomAccountProfile._meta.fields]
    
    def get_user_orders(self):
        orders = self.order_set.all()
        return orders


#WE have made extension of abstract user called CustomAccountProfile
# We have set this model/user to be the AUTH USER
#When new user is registered it does not register in auth table even though its set as the auth model