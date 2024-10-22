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
    products_list = OrderProductSerializer(source='order_product', many=True)
    class Meta:
        model = Order
        fields = ['id','username', 'products_list',  'created_at', 'status']
    
    # Add total price to order 
    def to_representation(self, instance):
        data = super().to_representation(instance)
        
        total_price = 0
        for product in data['products_list']:
            total_price += product['quantity'] * float(product['product']['price'])
        
        data['total_price'] = round(total_price, 4)
        
        return data
