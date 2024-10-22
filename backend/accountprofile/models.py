from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models

class CustomAccountProfileManager(BaseUserManager):
    def create_user(self, email, username=None, password=None, **extra_fields):
        if not email:
            raise ValueError("The Email field must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, username=username, **extra_fields)
        user.set_password(password)  # Hashes the password
        user.save(using=self._db)
        return user

    def create_superuser(self, email, username=None, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(email, username, password, **extra_fields)

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
    objects = CustomAccountProfileManager()

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
#So when 