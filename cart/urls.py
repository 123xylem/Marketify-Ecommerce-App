from django.conf import settings
from django.conf.urls.static import static
from django.urls import path
from .views import *

app_name='cart'
urlpatterns = [
    path('cart/add/<int:id>', add_to_cart, name='add_to_cart'),
    path('cart/remove/<int:id>', remove_from_cart, name='remove_from_cart'),
    path("checkout/<int:id>/", checkout, name="checkout_item"),
    path("checkout/", checkout, name="checkout_cart"),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
