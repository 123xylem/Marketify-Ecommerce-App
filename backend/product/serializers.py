from rest_framework import  serializers
from .models import Product, Category
from django.conf import settings


class CategorySerializer(serializers.ModelSerializer):
    child_cats = serializers.SerializerMethodField()
    
    class Meta:
        model = Category
        fields = ['id','title', 'parent', 'child_cats']
    
    def get_child_cats(self, instance) -> list:
            child_cats = []
            if instance.subcategories.all().first(): 
                for child in instance.subcategories.all():
                    child_cats.append({'id':child.id, 'title': child.title})

                return child_cats
            

class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer( many=True, read_only=True)
    image = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = ['id', 'title', 'slug', 'image', 'description', 'price', 'category', 'created_at']

    def get_image(self, obj) -> str:
        request = self.context.get('request')
        if obj.image:
            if request:
                return request.build_absolute_uri(obj.image.url)
            return f'http://localhost:8000{settings.MEDIA_URL}{obj.image}'
        return f'http://localhost:8000/media/__sized__/__placeholder__/images/placeholder-crop-c0-5__0-5-200x200-70.jpg'

