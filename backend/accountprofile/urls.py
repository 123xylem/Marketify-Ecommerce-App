from django.urls import path, include
from .views import  profilePage, RegisterView, getProfile, updateProfile, MyTokenObtainPairView
from rest_framework_simplejwt.views import  TokenRefreshView

app_name = 'accountprofile'
urlpatterns = [
  # path('register/', CreateUserView.as_view(), name='register'),
  path('token/', MyTokenObtainPairView.as_view(), name='token'),
  path('token/refresh/', TokenRefreshView.as_view(), name='refresh'),
  path('register/', RegisterView.as_view(), name='auth_register'),

  #Profile
  path('profile/', getProfile, name='profile'),
  path('profile/update/', updateProfile, name='update-profile'),

  path('frontend/profile/<int:pk>/', profilePage.as_view(), name='profile_page'),
]