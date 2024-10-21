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
from rest_framework.serializers import ValidationError
User = get_user_model()

# //TODO: change these all to class based views or viewSet? 
#TODO: swagger ui having issues with them
class profilePage(DetailView):
    model = CustomAccountProfile
    template_name = 'accountprofile/profile_page.html'

    def get_context_data(self, **kwargs):
        profile = self.get_object()  
        orders = profile.order_set.prefetch_related('order_product__product').all()
        o_list = []
        for ord in orders:
            products = list(ord.order_product.all()) 
            o_list.append({'id':ord.id,
                           'products': products, 
                           'date': ord.created_at})
        context = super().get_context_data(**kwargs)
        context['orders'] = o_list

        return context


@extend_schema(responses=CustomTokenObtainPairSerializer)
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

@extend_schema(responses=CustomAccountProfileSerializer)

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = CustomAccountProfileSerializer

#view Profile

@api_view(['GET'])
@extend_schema(responses=ProfileSerializer)
@permission_classes([IsAuthenticated])
def getProfile(request):

    user = CustomAccountProfile.objects.get(username=request.user)
    # order_list = user.get_profile_orders()
    serializer = ProfileSerializer(user, many=False)
    # print(user.email)
    return Response(serializer.data)

#Edit Profile
@api_view(['PUT'])
@extend_schema(responses=UpdateProfileSerializer)
@permission_classes([IsAuthenticated])
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
