from rest_framework import generics
from .serializers import CustomAccountProfileSerializer
from django.contrib.auth import get_user_model
from rest_framework.permissions import AllowAny
from drf_spectacular.utils import extend_schema
User = get_user_model()

@extend_schema(responses=CustomAccountProfileSerializer)
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = CustomAccountProfileSerializer
    permission_classes = [AllowAny]
