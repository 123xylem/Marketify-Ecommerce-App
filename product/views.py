from typing import Any
from django.shortcuts import render

from django.views.generic import ListView, DetailView

from .models import Product, Category


class ProductListView(ListView):
    model = Product
    paginate_by = 100  # if pagination is desired
    template_name = 'home.html'
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        return context

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
