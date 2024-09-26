from django.contrib import admin
from .models import Order, OrderProduct
# Register your models here.
# class ProductAdmin(admin.ModelAdmin):
#     list_display = ["title", "price", "image_tag", "get_categories"]
#     readonly_fields = ('display_image',)

#     def get_categories(self, obj):
#         return ", ".join([cat.title for cat in obj.category.all()])
#     get_categories.short_description = 'Categories'

#     def display_image(self, obj):
#         url = obj.image.url
#         return f'<img src=f"{url}">'
#     display_image.short_description = 'Img'

# admin.site.register(Product, ProductAdmin)

class OrderAdmin(admin.ModelAdmin):
  list_display = ['id',  'user', 'status', 'get_order_products']
  def get_order_products(self, obj):
    products = obj.order_product.all()
    return [ord.product for ord in products]
  get_order_products.short_description = 'Products in order'


admin.site.register(Order, OrderAdmin)