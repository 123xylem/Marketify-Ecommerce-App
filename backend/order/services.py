# from account.models import AccountProfile
from accountprofile.models import CustomAccountProfile
from order.models import Order, OrderProduct
import random

class OrderService:
  def create_order_from_cart(self, cart, req):
      print(req, req.user.id,  self, 'aaa')
      current_user = CustomAccountProfile.objects.get(id=req.user.id)
      print('2222', current_user)
      order = Order.objects.create(user=current_user)
      print(f'Created order {order.id} for user {current_user.username}')
      print(f'Products added to order: {[product.title for product in cart.products_list.all()]}')

      for product in cart.products_list.all():
          OrderProduct.objects.get_or_create(order=order, product=product)

      return self.process_order(order)
  
  def process_order(self, order):
    num = random.random()
    if num > 0.2:
      order.status = True
      order.save()
      print(order.status, 'ORDER PAYMENT COMPLETED!!!!!')
    else:
      print('ORDER PAYMENT FAILED!!!!!!')
    return order
