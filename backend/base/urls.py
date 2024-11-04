from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from product import views
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView
from .views import GlobalSiteContentViewSet
from product.views import CategoryView

urlpatterns = [
    path('admin/', admin.site.urls),
    # path('', views.HomePageView.as_view(), name='home'),
    path('api/products/', include('product.urls', namespace='product')),  
    path('api/site-content/<str:slug>', GlobalSiteContentViewSet.as_view({'get': 'retrieve'})),  
    path('api/cart/', include('cart.urls', namespace='cart')),
    path('api/orders/', include('order.urls', namespace='order')),
    path('api/accountprofile/', include('accountprofile.urls', namespace='accountprofile')),
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/schema/swagger-ui/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path("api/category/", CategoryView.as_view(), name="category_list"),

    # path("accounts/", include("allauth.urls")),
    # path('dj-rest-auth/', include('dj_rest_auth.urls')),
    # path('dj-rest-auth/google/', GoogleCallbackView.as_view(), name='google_login'),
    # path('auth/google/', google_login_reciever, name='google_login_reciever')

    # path('dj-rest-auth/', include('dj_rest_auth.urls')),
    path('accounts/', include('allauth.urls')),  # Google login
    path('dj-rest-auth/', include('dj_rest_auth.urls')),
    path('dj-rest-auth/registration/', include('dj_rest_auth.registration.urls')),
    # path('dj-rest-auth/google/', GoogleLogin.as_view(), name='google_login')

]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
# CREATE DATABASE marketifynew WITH TEMPLATE marketify OWNER postgres;


# SELECT pg_terminate_backend(pg_stat_activity.pid) FROM pg_stat_activity 
# WHERE pg_stat_activity.datname = 'marketify' AND pid <> pg_backend_pid();
