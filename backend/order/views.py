from django.shortcuts import render, get_object_or_404
from .models import Order, OrderProduct
from .serializers import OrderSerializer, OrderProductSerializer
from rest_framework import viewsets
from rest_framework.response import Response
from drf_spectacular.utils import extend_schema
from product.serializers import ProductSerializer
from product.models import Product
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated, AllowAny

@extend_schema(responses=OrderSerializer)
class OrderViewSet(viewsets.ModelViewSet):
  queryset = Order.objects.all()
  serializer_class = OrderSerializer
  permission_classes = [IsAuthenticated]
  def create(self, request, *args, **kwargs):
      order = Order.objects.create(user=request.user)
      print(request.data['prodIds'])
      for product in request.data['prodIds']:
        a_product = Product.objects.get(id=product['id'])
        orderProduct = OrderProduct.objects.create(product=a_product, order=order,quantity=product['quantity'] )
        orderProduct.save()
      order.save()
      # , 'products' : order.order_product.all()
      return Response({'order': self.serializer_class(order).data} )
  
  def retrieve(self, request, pk=None):
      print('RETRIECE')
      queryset = Order.objects.all()
      order = get_object_or_404(queryset, pk=pk)
      serializer = OrderSerializer(order).data
      products = OrderProduct.objects.filter(order=order)
      products_list = []
      for prod in products:
         products_list.append(prod.product)

      product_data = ProductSerializer(products_list, many=True).data
      print(serializer, product_data)
      return Response({'order_data': serializer, 'product_data': product_data, 'user': request.user})

  def list(self, request):
      print('LIST')

      user = request.user
      queryset = Order.objects.get_or_create(user=user)
      print(queryset)
      orders = OrderSerializer(queryset, many=True).data
      order_list = []
      for an_order in orders:
        products = OrderProduct.objects.filter(order=an_order['id'])
        products_list = []
        
        # for prod in products:
        #   products_list.append(prod.product)
        # an_order['products'] = products_list
        # product_data = ProductSerializer(products_list, many=True).data
        # order_list.append(an_order)
        print(an_order, '3')
      return Response({'orders_data': order_list,  'user': request.user})
 
  @action(detail=True, url_path='view_order', methods=['get'])
  def view_order(self, request, *args):
      order = Order.objects.get(id=pk)
      products = order.products_list.all()
      product_data = []
      product_data = ProductSerializer(products, many=True).data
      serializer = self.get_serializer(order).data
      return render(request, 'order/order.html', {'order_data': serializer, 'products': product_data, 'user': request.user})

@extend_schema(responses=OrderSerializer)
class OrderProductViewSet(viewsets.ModelViewSet):
  queryset = OrderProduct.objects.all()
  serializer_class = OrderProductSerializer
  permission_classes = [IsAuthenticated]
  def create(self, request, *args, **kwargs):

      print('orderProds!!!!!!', request.data)
      prods = []
      for product in args:
        orderProduct = OrderProduct.objects.create(product=product.id, order=product.order,quantity=product.quantity )
        orderProduct.save()
        prods.append(orderProduct)
      return Response({'data': f'{prods} Order products Created'})

