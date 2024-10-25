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

  def to_representation(self, instance):
      # Call the parent class's to_representation to get the default representation
      representation = super().to_representation(instance)

      product = representation['product']
      
      flattened_representation = {
          'id': representation['id'],
          'product_id': product['id'],
          'title': product['title'],
          'slug': product['slug'],
          'image': product['image'],
          'description': product['description'],
          'price': product['price'],
          'category': product['category'],  
          'created_at': product['created_at'],  
          'quantity': representation['quantity']
      }

      return flattened_representation
