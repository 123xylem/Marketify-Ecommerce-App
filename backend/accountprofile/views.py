from rest_framework import generics
from .serializers import CustomAccountProfileSerializer
from django.contrib.auth import get_user_model
from rest_framework.permissions import AllowAny, IsAuthenticated
from drf_spectacular.utils import extend_schema
from .models import CustomAccountProfile
from django.views.generic import DetailView

User = get_user_model()

@extend_schema(responses=CustomAccountProfileSerializer)
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = CustomAccountProfileSerializer
    permission_classes = [AllowAny]

class profilePage(DetailView):
    model = CustomAccountProfile
    template_name = 'accountprofile/profile_page.html'
    print(CustomAccountProfile.objects.all())
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

