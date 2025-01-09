from rest_framework import  serializers
from .models import Cart, CartItem
from product.serializers import ProductSerializer
class CartSerializer(serializers.ModelSerializer):
  class Meta:
    model = Cart
    fields = ['user', 'products_list']


class CartItemSerializer(serializers.ModelSerializer):
  product = ProductSerializer()

  class Meta:
    model = CartItem
    fields = ['id', 'product', 'quantity']
  
      # Call the parent class's to_representation to get the default representation
  def to_representation(self, instance):
    representation = super().to_representation(instance)
    product = representation['product']
    
    flattened_representation = {
        'id': representation.get('id', None),
        'product_id': product.get('id', None),
        'title': product.get('title', 'No title available'),
        'slug': product.get('slug', 'No slug available'),
        'image': product.get('image', None),
        'description': product.get('description', 'No description available'),
        'price': product.get('price', 0.0),
        'category': product.get('category', 'Uncategorized'),
        'created_at': product.get('created_at', None),
        'quantity': representation.get('quantity', 0)
    }

    return flattened_representation
