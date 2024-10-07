from typing import Any
from django.shortcuts import render, get_object_or_404

from django.views.generic import ListView, DetailView
from rest_framework.views import APIView

from .models import Product, Category
from .serializers import ProductSerializer
from rest_framework import viewsets
from rest_framework.response import Response
from drf_spectacular.utils import extend_schema

class HomePageView(ListView):
    model = Product
    template_name = 'home.html'
    context_object_name = 'products'


@extend_schema(responses=ProductSerializer)
class ProductViewSet(viewsets.ModelViewSet):
    lookup_fields = ['pk', 'slug']
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def list(self, request):
        serializer = self.get_serializer(self.queryset, many=True)
        # print(serializer.data, 'prods')
        return Response(serializer.data)

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

class ProductDetailView(DetailView):
    model= Product
    template_name='product-detail.html'

    # def get_queryset(self):
    #     # Retrieve all products. Modify this if you need specific filtering.
    #     return Product.objects.all()

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        product = self.object
        categories = product.category.all()
        context['categories'] = categories

        if categories:
            related_products = Product.objects.filter(category=categories.first()).exclude(pk=product.pk)
            context['related_products'] = related_products
        return context
