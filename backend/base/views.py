
from .models import GlobalSiteContent
from .serializers import GlobalSiteContentSerializer
from typing import Any
from django.shortcuts import render, get_object_or_404

from rest_framework import viewsets
from rest_framework.response import Response
from drf_spectacular.utils import extend_schema
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
# from .settings import VITE_OAUTH_CLIENT_ID, VITE_OAUTH_CLIENT_SECRET
import requests
from rest_framework.response import Response
# from rest_framework.views import APIView
from django.shortcuts import redirect
# import urllib.parse
# from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
# from allauth.socialaccount.providers.oauth2.client import OAuth2Client
# from dj_rest_auth.registration.views import SocialLoginView
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
        serializer = self.get_serializer(self.queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, *args, **kwargs):

        lookup_value = self.kwargs.get('slug') 
        GlobalSiteContent = get_object_or_404(self.queryset, slug=lookup_value)     
                                        
        serializer = self.get_serializer(GlobalSiteContent)

        return Response({
            'content': serializer.data,
        })


#1. Receive gogle login request from frontend and send user to app to get login code
# def google_login_reciever(request):
    # print('hit!')
    # google_oauth_url = "https://accounts.google.com/o/oauth2/v2/auth"
    # params = {
    #     "client_id": VITE_OAUTH_CLIENT_ID,
    #     "redirect_uri": "http://127.0.0.1:8000/dj-rest-auth/google/",
    #     "response_type": "code",
    #     "scope": "openid email profile",
    #     "access_type": "offline",
    # }
    # # https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=http://127.0.0.1:5173&prompt=consent&response_type=code&client_id=${VITE_OAUTH_CLIENT_ID}&scope=openid%20email%20profile&access_type=offline
    # # ttps://accounts.google.com/o/oauth2/v2/auth?client_id=92879841326-r1j75jel3j7i4hdm6g2vmlgd79kuic69.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Flocalhost%3A8000%2Fapi%2Fauth%2Fgoogle%2Fcallback%2F&response_type=code&scope=openid+email+profile&access_type=offline
    # url = f"{google_oauth_url}?{urllib.parse.urlencode(params)}"
    # print(url, 'redirected')
    # return redirect(url)


#2 This recieves the google callback. 
#first google sends get with the login code
# this uses that code to get access token + user_info from dj-rest

# 3 we swap that code for an access_token
#4 We use that token to ask google for user_info
#5 we create or get a user with tahat user_info
#6 we create a jwt token with the user and pass/store it for frontend
# class GoogleCallbackView(SocialLoginView):
    # adapter_class = GoogleOAuth2Adapter
    # callback_url = 'http://localhost:5173/'

    # def get_or_make_user(self, user_info):
    #     user, created = CustomAccountProfile.objects.get_or_create(email=user_info['email'], defaults={'username':user_info['email']})
    #     print(user, created)
    #     if created:
    #         temp_password = get_random_string()  
    #         user.set_password(temp_password)
    #         user.save()
    #         return [user, temp_password]
    #     return [user, None]
    
    # def create_jwt_token(self, user_info, temp_pw):
    #     jwt_token_url = 'http://localhost:8000/api/accountprofile/token/'
    #     bodyContent = {
    #         'password': temp_pw,
    #         'email': user_info['email']     
    #     }
    #     new_token = requests.post(jwt_token_url, data=bodyContent).json()
    #     print(new_token, 'post request for new token')
    #     return new_token     

    # def get(self, request):
    #     code = request.GET.get("code")

    #     # Exchange code for access token
    #     token_url = "https://oauth2.googleapis.com/token"
    #     token_data = {
    #         "code": code,
    #         "client_id": VITE_OAUTH_CLIENT_ID,
    #         "client_secret": VITE_OAUTH_CLIENT_SECRET,
    #         "redirect_uri": "http://127.0.0.1:8000/dj-rest-auth/google/",
    #         "grant_type": "authorization_code",
    #     }
    #     token_r = requests.post(token_url, data=token_data)        
    #     try:
    #         token_r.raise_for_status()
    #     except requests.exceptions.HTTPError as e:
    #         return Response({"error": str(e)}, status='notgood')

    #     token = token_r.json().get("access_token")

    #     # Retrieve user info and authenticate or register
    #     user_info = requests.get(
    #         "https://www.googleapis.com/oauth2/v1/userinfo",
    #         headers={"Authorization": f"Bearer {token}"},
    #     ).json()

    #     print(user_info, 'user |||')

    #     # and respond with JWT or session creation

    #     [user, temp_pw] = self.get_or_make_user(user_info)
    #     if user:
    #         print(user, 'this USER was returned')

    #     jwt_created = self.create_jwt_token(user_info, temp_pw)
    #     if jwt_created:
    #         session_id= uuid.uuid4()
    #         cache.set(session_id, jwt_created, 5000)
    #         print('JWT RES:', jwt_created, '|||')
    #         frontend_url = f"http://localhost:5173/login?session_id={session_id}"
    #         return redirect(frontend_url)
    #     return Response({'status': 'Couldnt create jwt token'}, status=400)


# from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
# from allauth.socialaccount.providers.oauth2.client import OAuth2Client
# from dj_rest_auth.registration.views import SocialLoginView

# class GoogleLogin(SocialLoginView): 
#     print('im hit!')
#     adapter_class = GoogleOAuth2Adapter
#     callback_url = 'http://127.0.0.1:5173'
#     client_class = OAuth2Client

#     # return redirect('http://localhost:5173')

# @receiver(pre_social_login)
# def on_pre_social_login(sender, request, sociallogin, **kwargs):
#     user = sociallogin.user
#     refresh = RefreshToken.for_user(user)
#     token = str(refresh.access_token)
#     print(user, refresh, 'user & request')
#     session_key = user + '-jwt_token'
#     # Store token in session (or a unique ID tied to the session)
#     request.session[session_key] = token
    # print(request.session.items(), 'items!')
    # Redirect to frontend with session key or a unique identifier
    # return redirect("http://localhost:5173/login")


@receiver(pre_social_login)
def on_pre_social_login(sender, request, sociallogin, **kwargs):
    user = sociallogin.user
    
    # Generate a unique identifier for this login attempt
    user_identifier = str(uuid.uuid4())
    
    # Generate JWT token
    refresh = RefreshToken.for_user(user)
    token = str(refresh.access_token)
    
    # Store token in session with unique identifier
    session_key = f"{user_identifier}-jwt_token"
    print(session_key, 'aaa')
    request.session[session_key] = token
    print(request.session[session_key], 'the token?????')
    # Construct redirect URL with user identifier
    redirect_url = f"http://localhost:5173/login?user_identifier={user_identifier}"
    
    return redirect(redirect_url)


# from allauth.socialaccount.views import CompleteView
# from django.shortcuts import redirect

# class CustomSocialLoginCompleteView(CompleteView):
#     def get(self, request, *args, **kwargs):
#         # Call the original CompleteView to process the login
#         response = super().get(request, *args, **kwargs)
        
#         # Construct your redirect URL with query parameters
#         redirect_url = "http://localhost:3000/auth/callback"
#         query_string = "?your_param=your_value"  # Modify this as needed
#         final_redirect_url = redirect_url + query_string
        
#         # Redirect to the final URL
#         return redirect(final_redirect_url)
