from rest_framework import generics
from .serializers import CustomAccountProfileSerializer, ProfileSerializer, MyTokenObtainPairSerializer
from django.contrib.auth import get_user_model
from rest_framework.permissions import AllowAny, IsAuthenticated
from drf_spectacular.utils import extend_schema
from .models import CustomAccountProfile
from django.views.generic import DetailView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView

User = get_user_model()

# @extend_schema(responses=CustomAccountProfileSerializer)
# class CreateUserView(generics.CreateAPIView):
#     queryset = User.objects.all()
#     serializer_class = CustomAccountProfileSerializer
#     permission_classes = [AllowAny]

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


@extend_schema(responses=MyTokenObtainPairSerializer)
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = CustomAccountProfileSerializer

#api/profile  and api/profile/update
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getProfile(request):
    user = request.user
    serializer = ProfileSerializer(user, many=False)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateProfile(request):
    user = request.user
    serializer = ProfileSerializer(user, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

# #api/notes
# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def getNotes(request):
#     public_notes = Note.objects.filter(is_public=True).order_by('-updated')[:10]
#     user_notes = request.user.notes.all().order_by('-updated')[:10]
#     notes = public_notes | user_notes
#     serializer = NoteSerializer(notes, many=True)
#     return Response(serializer.data)
