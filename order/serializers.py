from rest_framework import  serializers
from .models import Order, OrderProduct
from product.serializers import ProductSerializer

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['user', 'created_at', 'status']

class OrderProductSerializer(serializers.ModelSerializer):
    products = ProductSerializer(many=True, read_only=True)
    class Meta:
        model = OrderProduct
        fields = ['products', 'order', 'quantity']

