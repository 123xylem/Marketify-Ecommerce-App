from django.shortcuts import render, get_object_or_404
from .models import Order, OrderProduct
from .serializers import OrderSerializer, OrderProductSerializer
from rest_framework import viewsets
from rest_framework.response import Response
from drf_spectacular.utils import extend_schema
from product.serializers import ProductSerializer
from product.models import Product
from rest_framework.decorators import action

@extend_schema(responses=OrderSerializer)
class OrderViewSet(viewsets.ModelViewSet):
  queryset = Order.objects.all()
  serializer_class = OrderSerializer

  def create(self, request, *args, **kwargs):
      order = Order.objects.create(user=request.user)
      order.save()
      return Response({'data': f'{self.serializer_class(order).data} Order Created'})
  
  def retrieve(self, request, pk=None):
      queryset = Order.objects.all()
      order = get_object_or_404(queryset, pk=pk)
      serializer = OrderSerializer(order).data
      products = OrderProduct.objects.filter(order=order)
      product_list = []
      for prod in products:
         product_list.append(prod.product)

      product_data = ProductSerializer(product_list, many=True).data
      print(serializer, product_data)
      return render(request, 'order/order.html', {'order_data': serializer, 'product_data': product_data, 'user': request.user})

  def list(self, request):
      queryset = Order.objects.all()
      orders = OrderSerializer(queryset, many=True).data
      order_list = []
      for an_order in orders:
        products = OrderProduct.objects.filter(order=an_order['id'])
        product_list = []
        for prod in products:
          product_list.append(prod.product)
        an_order['products'] = product_list
        # product_data = ProductSerializer(product_list, many=True).data
        order_list.append(an_order)
      return render(request, 'order/orders.html', {'orders_data': order_list,  'user': request.user})
 
  @action(detail=True, url_path='view_order', methods=['get'])
  def view_order(self, request, *args):
      order = Order.objects.get(id=pk)
      products = order.product_list.all()
      product_data = []
      product_data = ProductSerializer(products, many=True).data
      serializer = self.get_serializer(order).data
      return render(request, 'order/order.html', {'order_data': serializer, 'products': product_data, 'user': request.user})

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

