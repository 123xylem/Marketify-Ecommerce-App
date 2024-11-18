from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from product import views
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView
from .views import GlobalSiteContentViewSet, handle_email
from product.views import CategoryView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/products/', include('product.urls', namespace='product')),  
    path('api/site-content/<str:slug>', GlobalSiteContentViewSet.as_view({'get': 'retrieve'})),  
    path('api/cart/', include('cart.urls', namespace='cart')),
    path('api/orders/', include('order.urls', namespace='order')),
    path('api/accountprofile/', include('accountprofile.urls', namespace='accountprofile')),
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/schema/swagger-ui/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path("api/category/", CategoryView.as_view(), name="category_list"),
    path('accounts/', include('allauth.urls')),  # Google login
    path('api/handle-email/', handle_email, name="handle_email")
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
