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
    orders = serializers.SerializerMethodField()
    class Meta:
        model = User
        fields = ['username', 'id', 'email', 'address', 'orders']
    
    def get_orders(self, obj):
        # Assuming get_profile_orders returns a queryset of Order objects
        orders = obj.get_user_orders()
        return OrderSerializer(orders, many=True).data

class OrderlessProfileSerializer(serializers.ModelSerializer):
    def __init__(self, *args, **kwargs):
        super(OrderlessProfileSerializer, self).__init__(*args, **kwargs)
        # print(kwargs['data'], kwargs['data']['username'])
        try:
            # pass
            print(vars(self), self.context)
            if self.context['request'].method in ['PUT']:
                self.fields['username'] = kwargs['data']['username']
                print(self.fields)
        except KeyError:
            print(KeyError)
    class Meta:
        model = User
        fields = ['username', 'id', 'email', 'address']
    
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        # token['password'] = user.password
        token['email'] = user.email
        # ...

        return token

