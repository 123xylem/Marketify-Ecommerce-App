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

]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
