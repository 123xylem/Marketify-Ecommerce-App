from django.urls import path, include
from .views import CreateUserView, profilePage
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

app_name = 'accountprofile'
urlpatterns = [
  path('register/', CreateUserView.as_view(), name='register'),
  path('token/', TokenObtainPairView.as_view(), name='token'),
  path('token/refresh/', TokenRefreshView.as_view(), name='refresh'),
  path('frontend/profile/<int:pk>/', profilePage.as_view(), name='profile_page'),
]