from typing import Any, NoReturn
from django.shortcuts import render, get_object_or_404
from django.db.models import Q
from django.views.generic import ListView, DetailView
from rest_framework.views import APIView
from rest_framework.decorators import action
from .models import Product, Category
from .serializers import ProductSerializer, CategorySerializer
from rest_framework import viewsets
from rest_framework.response import Response
from drf_spectacular.utils import extend_schema
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import permission_classes
class HomePageView(ListView):
    model = Product
    template_name = 'home.html'
    context_object_name = 'products'


@permission_classes([AllowAny])
@extend_schema(responses=ProductSerializer)
class ProductViewSet(viewsets.ModelViewSet):
    lookup_fields = ['pk', 'slug']
    serializer_class = ProductSerializer
    queryset = Product.objects.prefetch_related('categories').all()

    def get_queryset(self):
        """
        Use URL Get to determine queryset
        """
        queryset = self.queryset
        category = self.request.query_params.get('cat', None)
        if category:
            #link title of category to a product that has one of these via the ID's
            cat = Category.objects.filter(title__iexact=category).first()
            queryset = Product.objects.prefetch_related('categories').filter(category=cat)
            return queryset
        
        search = self.request.query_params.get('search', None)
        if search is not None:
            queryset = Product.objects.prefetch_related('categories').filter(Q(title__icontains=search) | Q(description__icontains=search))
            return queryset
        
        return Product.objects.prefetch_related('categories').all()


    def list(self, request, *args, **kwargs) -> NoReturn:
        serializer = self.get_serializer(self.get_queryset(), many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['post'])
    def search(self,request):
        return Response(request)

    def retrieve(self, request, *args, **kwargs):
        lookup_value = self.kwargs.get('pk') 
        if lookup_value.isdigit():  
            product = get_object_or_404(self.queryset, pk=lookup_value)
        else:
            product = get_object_or_404(self.queryset, slug=lookup_value)     
                                        
        serializer = self.get_serializer(product)
        categories = product.category.all()

        related_products = Product.objects.filter(category__in=categories).exclude(pk=product.pk).distinct()
        related_serializer = self.get_serializer(related_products, many=True)

        return Response({
            'product': serializer.data,
            'related_products': related_serializer.data
        })



@permission_classes([AllowAny])
@extend_schema(responses=CategorySerializer)
class CategoryView(APIView):
    permission_classes = [AllowAny] 

    def get(self, request):
        queryset = Category.objects.all()
        serializer = CategorySerializer(queryset, many=True).data
        return Response(serializer)
