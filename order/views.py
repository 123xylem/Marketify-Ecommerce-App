from django.shortcuts import render, get_object_or_404
from .models import Order, OrderProduct
from .serializers import OrderSerializer, OrderProductSerializer
from rest_framework import viewsets
from rest_framework.response import Response
from drf_spectacular.utils import extend_schema


@extend_schema(responses=OrderSerializer)
class OrderViewSet(viewsets.ModelViewSet):
  queryset = Order.objects.all()
  serializer_class = OrderSerializer

  def create(self, request, *args, **kwargs):
      order = Order.objects.create(user=request.user)
      order.save()
      return Response({'data': f'{self.serializer_class(order).data} Order Created'})


@extend_schema(responses=OrderSerializer)
class OrderProductViewSet(viewsets.ModelViewSet):
  queryset = OrderProduct.objects.all()
  serializer_class = OrderProductSerializer

  def create(self, request, *args, **kwargs):
      prods = []
      for product in args:
        orderProduct = OrderProduct.objects.create(product=product.id, order=product.order,quantity=product.quantity )
        orderProduct.save()
        prods.append(orderProduct)
      return Response({'data': f'{prods} Order products Created'})

