from django.contrib import admin
from .models import Product, Category
# Register your models here.
class ProductAdmin(admin.ModelAdmin):
    list_display = ["title", "price", "image_tag", "get_categories"]
    readonly_fields = ('display_image',)

    def get_categories(self, obj):
        return ", ".join([cat.title for cat in obj.category.all()])
    get_categories.short_description = 'Categories'

    def display_image(self, obj):
        url = obj.image.url
        return f'<img src=f"{url}">'
    display_image.short_description = 'Img'

admin.site.register(Product, ProductAdmin)


class CategoryAdmin(admin.ModelAdmin):
    list_display = ["title"]

admin.site.register(Category, CategoryAdmin)