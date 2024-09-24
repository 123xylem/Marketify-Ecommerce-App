from django.conf import settings
from django.conf.urls.static import static
from django.urls import path, include
from rest_framework import routers
from .views import *

router = routers.DefaultRouter()
router.register(r'', CartViewSet)

app_name='cart'
urlpatterns = [
    path('', include(router.urls)),
    path('frontend/cart', cart_viewer, name="view-cart"),
    path('cart/add/<int:id>', add_to_cart, name='add_to_cart'),
    path('cart/remove/<int:id>', remove_from_cart, name='remove_from_cart'),
    path("cart/checkout/<int:id>", checkout, name="checkout_with_id"),
    path("cart/checkout/", checkout, name="checkout"),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
