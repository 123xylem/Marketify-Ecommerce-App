
from .models import GlobalSiteContent
from .serializers import GlobalSiteContentSerializer
from typing import Any
from django.shortcuts import render, get_object_or_404

from rest_framework import viewsets
from rest_framework.response import Response
from drf_spectacular.utils import extend_schema
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
import requests
from rest_framework.response import Response
from django.shortcuts import redirect
from accountprofile.models import CustomAccountProfile
# from .utils import get_random_string
import uuid
from django.dispatch import receiver

from allauth.socialaccount.signals import pre_social_login

# from django.core.cache import cache

@extend_schema(responses=GlobalSiteContentSerializer)
class GlobalSiteContentViewSet(viewsets.ModelViewSet):
    queryset = GlobalSiteContent.objects.all()
    serializer_class = GlobalSiteContentSerializer
    permission_classes = [AllowAny]
    def list(self, request):
        print('??')
        serializer = self.get_serializer(self.queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, *args, **kwargs):
        print('retrived footer', self.kwargs)
        lookup_value = self.kwargs.get('slug') 
        GlobalSiteContent = get_object_or_404(self.queryset, slug=lookup_value)     
        print('retrived footer', lookup_value, GlobalSiteContent)
                  
        serializer = self.get_serializer(GlobalSiteContent)

        return Response({
            'content': serializer.data,
        })


# @receiver(pre_social_login)
# def on_pre_social_login(sender, request, sociallogin, **kwargs):
#     user = sociallogin.user
    
#     # Generate a unique identifier for this login attempt
#     user_identifier = str(uuid.uuid4())
    
#     # Generate JWT token
#     refresh = RefreshToken.for_user(user)
#     token = str(refresh.access_token)
    
#     # Store token in session with unique identifier
#     session_key = f"{user_identifier}-jwt_token"
#     print(session_key, 'aaa')
#     request.session[session_key] = token
#     print(request.session[session_key], 'the token?????')
#     # Construct redirect URL with user identifier
#     redirect_url = f"http://localhost:5173/login?user_identifier={user_identifier}"
    
#     return redirect(redirect_url)

