from rest_framework import generics, status
from .serializers import CustomAccountProfileSerializer, ProfileSerializer,  UpdateProfileSerializer, CustomTokenObtainPairSerializer
from django.contrib.auth import get_user_model
from rest_framework.permissions import AllowAny, IsAuthenticated
from drf_spectacular.utils import extend_schema
from .models import CustomAccountProfile
from django.views.generic import DetailView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.serializers import ValidationError
from django.http import JsonResponse
import json
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
from base.utils import *
from django.utils import timezone
from datetime import timedelta



User = get_user_model()
class profilePage(DetailView):
    model = CustomAccountProfile
    template_name = 'accountprofile/profile_page.html'

    # def get_context_data(self, **kwargs):
    #     profile = self.get_object()  
    #     orders = []
    #     profile.order_set.prefetch_related('order_product__product').all().order_by('created_at')
    #     o_list = []
    #     for ord in orders:
    #         products = list(ord.order_product.all()) 
    #         o_list.append({'id':ord.id,
    #                        'products': products, 
    #                        'date': ord.created_at})
    #     context = super().get_context_data(**kwargs)
    #     context['orders'] = o_list

    #     return context


@extend_schema(responses=CustomTokenObtainPairSerializer)
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

@extend_schema(responses=CustomAccountProfileSerializer)
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = CustomAccountProfileSerializer
    def create(self, request):
        if 'password' in request.data:
            user = CustomAccountProfile.objects.create_user(email=request.data['email'], username=request.data['username'], password=request.data['password'])
            serializer = self.serializer_class(user).data
            return Response({'status': serializer}, status=201)
        return Response({'status': 'No password in request'}, status=400)
    
#view Profile
@extend_schema(
    responses=ProfileSerializer, 
    description="Retrieve the authenticated user's profile data."
)
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getProfile(request):
    user = CustomAccountProfile.objects.get(username=request.user)
    serializer = ProfileSerializer(user, many=False)
    return Response(serializer.data)

#Edit Profile
@permission_classes([IsAuthenticated])
@extend_schema(responses=UpdateProfileSerializer)
@api_view(['PUT'])
def updateProfile(request):
    user = CustomAccountProfile.objects.get(username=request.user)
    print('incoming data',request.data, request.COOKIES)
    request.data['id'] = user.id
    user.username = request.data['username']
    user.email = request.data['email']
    user.address = request.data['address']
    # if user.is_valid():
    #     user.save()
    serializer = UpdateProfileSerializer(user, data=request.data,  partial=True)

    try:
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

def get_tokens_for_user(user) -> dict[str, str]:
    refresh = RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }


def validate_user_login(request):
    data = json.loads(request.body)
    code = decrypt_email(data.get("em_id"))
    code_parts = code.split(' --- ')
    
    if len(code_parts) < 3:
        return {"error": "Invalid email code format"}

    email, _, ip = code_parts
    client_ip = get_client_ip(request)
    if client_ip != ip and client_ip != request.META.get('REMOTE_ADDR'):
        return {"error": "Invalid login ip location"}

    user = CustomAccountProfile.objects.get(email=email)

    if user:
        if user.last_login:
            time_since_last_login = timezone.now() - user.last_login

            # Check if last login was within the last minute
            if time_since_last_login < timedelta(minutes=1):
                  return user
        else:
            return {"error": "User took too long to verify"}

    else:
        return {"error": "No user with that email "}


@csrf_exempt
@permission_classes([AllowAny])
def get_jwt_token(request, *args, **kwargs):
    print('TOKEN REQUETED', request.body, request.POST.get("emid_code"))
    user = validate_user_login(request)
    print('user is :', user)
    if not isinstance(user, CustomAccountProfile):
        return JsonResponse(user, status=400)

    token_data = get_tokens_for_user(user)
    return JsonResponse({'success': token_data, 'username': user.username, 'userID': user.id}, status=200)
           
