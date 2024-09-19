from django.conf import settings
from django.conf.urls.static import static
from django.urls import path, include
from .views import *
from rest_framework import routers

# app_name='product'

router = routers.DefaultRouter()
router.register(r'', ProductViewSet)

urlpatterns = [
    # path('', ProductListView.as_view(), name='home'),
    path('', include(router.urls)),
    path('auth-editor/', include('rest_framework.urls'), name='rest_framework'),
    path("product/<slug:slug>/", ProductDetailView.as_view(), name="product_detail"),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
