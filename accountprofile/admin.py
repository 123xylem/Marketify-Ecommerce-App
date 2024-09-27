from django.contrib import admin
from .models import CustomAccountProfile
# Register your models here.

class CustomAccountProfileAdmin(admin.ModelAdmin):
  list_display = ['username', 'email', 'id', 'staff_status']
  
  def staff_status(self,obj):
    return 'Staff' if( obj.is_staff ) else 'Shopper'

admin.site.register(CustomAccountProfile, CustomAccountProfileAdmin)