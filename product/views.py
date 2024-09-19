from typing import Any
from django.shortcuts import render, get_object_or_404
# from django.http.response import Response

from django.views.generic import ListView, DetailView

from .models import Product, Category
from .serializers import ProductSerializer
from rest_framework import viewsets
from rest_framework.response import Response

# class ProductListView(ListView):
#     model = Product
#     paginate_by = 100  # if pagination is desired
#     template_name = 'home.html'
#     def get_context_data(self, **kwargs):
#         context = super().get_context_data(**kwargs)
#         return context
    
class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()

    def list(self, request):
        serializer = ProductSerializer(self.queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        Product = get_object_or_404(self.queryset, pk=pk)
        serializer = ProductSerializer(Product)
        categories = Product.category.all()
        if categories:
            related_products = Product.objects.filter(category=categories.first()).exclude(pk=product.pk)
        
        print(serializer, type(serializer))

        return Response(serializer.data)


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
