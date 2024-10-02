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

    def get_get_user_orders_orders(self):
        orders = self.order_set.prefetch_related('order_product__product').all()
        o_list = []
        for ord in orders:
            products = list(ord.order_product.all()) 
            o_list.append({'id':ord.id,
                            'products': products, 
                            'date': ord.created_at})
        return o_list
    
    def get_user_orders(self):
        orders = self.order_set.all()
        return orders

