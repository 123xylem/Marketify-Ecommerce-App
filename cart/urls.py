from django.conf import settings
from django.conf.urls.static import static
from django.urls import path, include
from rest_framework import routers
from .views import CartViewSet

router = routers.DefaultRouter()
router.register(r'cart', CartViewSet)

app_name='cart'
urlpatterns = [
    # path('api/', include(router.urls)),
    # path('add/<int:id>', add_to_cart, name='add_to_cart'),
    # path('remove/<int:id>', remove_from_cart, name='remove_from_cart'),
    # path("checkout/<int:id>", checkout, name="checkout_with_id"),
    # path("checkout/", checkout, name="checkout"),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
