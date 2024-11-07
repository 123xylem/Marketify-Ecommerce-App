from rest_framework import serializers
from django.contrib.auth import get_user_model
from order.serializers import OrderSerializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

User = get_user_model()
class CustomAccountProfileSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    orders = OrderSerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'address', 'orders']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            address=validated_data.get('address', '')
        )
        return user

class ProfileSerializer(serializers.ModelSerializer):
    # orders = serializers.SerializerMethodField()
    class Meta:
        model = User
        # fields = ['username', 'id', 'email', 'address', 'orders']
        fields = ['username', 'id', 'email', 'address']
    
    def get_orders(self, obj) -> dict:
        orders = obj.get_user_orders().order_by('-created_at')
        orders = OrderSerializer(orders, many=True).data

        return orders
class UpdateProfileSerializer(serializers.ModelSerializer):
    def update(self, instance, validated_data):
        instance.email = validated_data.get('email', instance.email)
        instance.username = validated_data.get('username', instance.username)
        instance.address = validated_data.get('address', instance.address)
        instance.save()
        return instance
    class Meta:
        model = User
        fields = ['username', 'email', 'address']
    
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        # The default result (access/refresh tokens)
        data = super().validate(attrs)
        # Include user information in the response data
        data.update({
            'user': self.user.username,
            'id': self.user.id,
        })

        return data
