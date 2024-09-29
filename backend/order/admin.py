from django.contrib import admin
from .models import Order
class OrderAdmin(admin.ModelAdmin):
  list_display = ['id',  'user', 'status', 'get_order_products']
  def get_order_products(self, obj):
    products = obj.order_product.all()
    return [ord.product for ord in products]
  get_order_products.short_description = 'Products in order'


admin.site.register(Order, OrderAdmin)