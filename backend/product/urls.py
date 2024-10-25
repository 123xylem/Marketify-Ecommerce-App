from django.conf import settings
from django.conf.urls.static import static
from django.urls import path, include
from .views import *
from product import views
from rest_framework import routers

app_name='product'

router = routers.DefaultRouter()
router.register(r'', views.ProductViewSet, basename="product")
# router.register(r'', views.CategoryViewSet, basename="category")

urlpatterns = [
    path('', include(router.urls)),
    path("frontend/product/<slug:slug>/", ProductDetailView.as_view(), name="product_detail"),
    # path("category/category/", CategoryView.as_view(), name="category_list"),

]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
