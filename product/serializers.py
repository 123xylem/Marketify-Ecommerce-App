from rest_framework import  serializers
from .models import Product, Category

class ProductSerializer(serializers.Serializer):
    class Meta:
        model = Product
        fields = ['category', 'title', 'image', 'description', 'price', 'created_at']

class CategorySerializer(serializers.Serializer):
    class Meta:
        model = Category
        fields = ['title', 'parent']
