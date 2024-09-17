from django.shortcuts import render

from django.views.generic import ListView

from .models import Product


class ProductListView(ListView):
    model = Product
    paginate_by = 100  # if pagination is desired
    template_name = 'home.html'
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['product_list'] = Product.objects.all()
        return context
