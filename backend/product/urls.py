from django.conf import settings
from django.conf.urls.static import static
from django.urls import path, include
from .views import *
from rest_framework import routers

app_name='product'

router = routers.DefaultRouter()
router.register(r'', ProductViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('product/<str:slug>', ProductViewSet.as_view({'get': 'retrieve'})),

    path("frontend/product/<slug:slug>/", ProductDetailView.as_view(), name="product_detail"),

]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
