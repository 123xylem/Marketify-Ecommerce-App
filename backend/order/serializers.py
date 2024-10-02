from rest_framework import  serializers
from .models import Order, OrderProduct
from product.serializers import ProductSerializer
# from account.models import AccountProfile

class OrderProductSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True) 

    class Meta:
        model = OrderProduct
        fields = ['id', 'product', 'order', 'quantity']

class OrderSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S")
    username = serializers.CharField(source='user.username', read_only=True)
    product_list = OrderProductSerializer(source='order_product', many=True)
    class Meta:
        model = Order
        fields = ['id','username', 'product_list', 'created_at', 'status']
