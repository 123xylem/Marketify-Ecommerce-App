from rest_framework import  serializers
from .models import Order, OrderProduct
from product.serializers import ProductSerializer
from account.models import AccountProfile
class OrderSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S")
    username = serializers.CharField(source='user.user', read_only=True)
    class Meta:
        model = Order
        fields = ['id','user','username', 'created_at', 'status']

class OrderProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderProduct
        fields = ['products', 'order', 'quantity']

