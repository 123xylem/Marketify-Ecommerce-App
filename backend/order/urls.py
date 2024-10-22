from django.conf import settings
from django.conf.urls.static import static
from django.urls import path, include
from .views import *
from rest_framework import routers

app_name='order'

router = routers.DefaultRouter()
router.register(r'', OrderViewSet, OrderProductViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('stripe/create-checkout-session/', CreateCheckoutSession, name='create-checkout-session'),
    path('stripe/payment-handler/', payment_handler, name='payment_handler'),
    path('stripe/session-status/', SessionStatus.as_view(), name='session-status'),

]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
