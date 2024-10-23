from django.contrib import admin
from .models import CustomAccountProfile
# from .forms import *

class CustomAccountProfileAdmin(admin.ModelAdmin):
  # add_form = CustomAccountProfileCreationForm
  # form = CustomAccountProfileChangeForm
  # model = CustomAccountProfile

  list_display = ['username', 'email', 'id', 'staff_status']
  
  def staff_status(self,obj):
    return 'Staff' if( obj.is_staff ) else 'Shopper'

admin.site.register(CustomAccountProfile, CustomAccountProfileAdmin)