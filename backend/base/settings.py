from pathlib import Path
import os, json
from decouple import config
from datetime import timedelta
import dj_database_url
import cloudinary

PROJECT_DIR = Path(__file__).resolve().parent.parent
PRODUCT_DIR = os.path.join(PROJECT_DIR, 'product')
CART_DIR = os.path.join(PROJECT_DIR, 'cart')
BASE_DIR = os.path.join(PROJECT_DIR, 'base')
ORDER_DIR = os.path.join(PROJECT_DIR, 'order')

email_db_env = json.loads(config('EMAIL_DB_ENV'))

EMAIL_HOST = email_db_env['host']
EMAIL_USER = email_db_env['EMAIL_USER']
EMAIL_PW = email_db_env['EMAIL_PW']

SECRET_KEY = email_db_env['DJANGO_SECRET']
DEBUG = email_db_env['DEBUG'] == 'True'
FRONTEND_DOMAIN = config('FRONTEND_DOMAIN')
DATABASE_URL = config('DATABASE_URL')

STRIPE_SK = config('STRIPE_SK')

# Parse the VITE_AUTH_ID_SECRET_CALLBACK variable
vite_auth_data = json.loads(config('VITE_AUTH_ID_SECRET_CALLBACK'))

VITE_OAUTH_CLIENT_ID = vite_auth_data['VITE_OAUTH_CLIENT_ID']
VITE_OAUTH_CLIENT_SECRET = vite_auth_data['VITE_OAUTH_CLIENT_SECRET']
VITE_OAUTH_CALLBACK_URL = vite_auth_data['VITE_OAUTH_CALLBACK_URL']

# Access VITE_BACKEND_URL
VITE_BACKEND_URL = config('VITE_BACKEND_URL')
IMAGE_HOST_SECRET = config('IMAGE_HOST_SECRET')

LOGIN_URL = 'marketify_login'

# DEBUG = config('DEBUG', default=False, cast=bool)
AUTH_USER_MODEL = 'accountprofile.CustomAccountProfile'
SOCIALACCOUNT_AUTO_SIGNUP = True

ALLOWED_HOSTS = [    
     FRONTEND_DOMAIN,
    'https://marketify.up.railway.app',
    'https://marketify-backend.up.railway.app',
    'marketify-backend.up.railway.app',
    'marketify.up.railway.app'
]
if DEBUG:
    ALLOWED_HOSTS = ['*']
   
SITE_ID=2
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.sites',



    'product',
    'cart',
    # 'account',
    'order',
    'accountprofile',

    'allauth',
    'allauth.account',
    'allauth.socialaccount',
    'allauth.socialaccount.providers.google',
    'django_rename_app',
    'base',
    'versatileimagefield',
    'django_sass',
    'rest_framework',
    'rest_framework.authtoken',
    'drf_spectacular',
    'corsheaders',
    'rest_framework_simplejwt',
    # 'dj_rest_auth',
    # 'dj_rest_auth.registration',
    'cloudinary_storage',
    'cloudinary',   
]

cloudinary.config(
    cloud_name="dnwglax7z",
    api_key="185675124494865",
    api_secret=IMAGE_HOST_SECRET,
    secure=True
)


DEFAULT_FILE_STORAGE = 'cloudinary_storage.storage.MediaCloudinaryStorage'

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'allauth.account.middleware.AccountMiddleware',
    # 'base.middleware.timelogging.LogRequestTimingMiddleware'# ENABLE TO VIEW REQUEST TIMEs
]
ACCOUNT_ADAPTER = 'accountprofile.adapter.AccountAdapter'
AUTHENTICATION_BACKENDS = ("django.contrib.auth.backends.ModelBackend", "allauth.account.auth_backends.AuthenticationBackend")

SESSION_ENGINE = 'django.contrib.sessions.backends.db'
SESSION_COOKIE_AGE = 1000600 
SESSION_EXPIRE_AT_BROWSER_CLOSE = False

ROOT_URLCONF = 'base.urls'
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [   
                    os.path.join(PROJECT_DIR, 'cart', 'templates/cart'),
                    os.path.join(PROJECT_DIR, 'base', 'templates'),  
                    os.path.join(PROJECT_DIR, 'accountprofile', 'templates/accountprofile'),  
                    os.path.join(PROJECT_DIR, 'order', 'templates/order'),  
                    os.path.join(PROJECT_DIR, 'product', 'templates/product'),
                    os.path.join(PROJECT_DIR, 'templates')
         ],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]


WSGI_APPLICATION = 'base.wsgi.application'

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'verbose': {
            'format': '{levelname} {asctime} {module} {message}',
            'style': '{',
        },
        'simple': {
            'format': '{levelname} {message}',
            'style': '{',
        },
    },
    'handlers': {
        'console': {
            'level': 'WARNING',
            'class': 'logging.StreamHandler',
            'formatter': 'verbose',
        },
    },
    'loggers': {
        'django': {
            'handlers': ['console'],
            'level': os.getenv('DJANGO_LOG_LEVEL', 'DEBUG'),
            'propagate': False,
        },
    },
}


# Database

DATABASES = {
    'default': dj_database_url.config(default=DATABASE_URL)
}
# Password validation
# https://docs.djangoproject.com/en/5.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/5.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.0/howto/static-files/

STATIC_URL = '/static/'

STATICFILES_DIRS = [
    os.path.join(PROJECT_DIR, 'static/'),
    os.path.join(PRODUCT_DIR, 'static/'),
    os.path.join(ORDER_DIR, 'static/'),
]

# STATIC_ROOT = os.path.join(PROJECT_DIR, STATIC_URL)

# print(STATIC_ROOT)
MEDIA_ROOT = PROJECT_DIR / 'media'
MEDIA_URL = '/media/'
# Default primary key field type
# https://docs.djangoproject.com/en/5.0/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

SOCIALACCOUNT_PROVIDERS = {
    'google': {
        'APP': {
        'client_id': VITE_OAUTH_CLIENT_ID,
        'secret': VITE_OAUTH_CLIENT_SECRET,
            'key': ''  
        },
        'SCOPE': [
            'profile',
            'email',
        ],
        'AUTH_PARAMS': {
            'access_type': 'online',
            'prompt': 'select_account',
        },
        'FETCH_USERINFO' : True

    }
}


LOGIN_REDIRECT_URL=FRONTEND_DOMAIN+"/login?jwtNeeded=true"
LOGOUT_REDIRECT_URL=FRONTEND_DOMAIN+"/logout?loggedout=true"

ACCOUNT_EMAIL_REQUIRED = True
ACCOUNT_UNIQUE_EMAIL = True
ACCOUNT_AUTHENTICATION_METHOD = 'email'
ACCOUNT_USERNAME_REQUIRED = False

ACCOUNT_DEFAULT_HTTP_PROTOCOL = 'http'


REST_FRAMEWORK = {
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 3,
    'DEFAULT_SCHEMA_CLASS': 'drf_spectacular.openapi.AutoSchema',
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.AllowAny',
    ),
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
}

REST_AUTH = {
    'USE_JWT': True,
    'JWT_AUTH_COOKIE': 'my-app-auth',
    'JWT_AUTH_REFRESH_COOKIE': 'my-refresh-token',

}

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=2600),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=7),
   }

SPECTACULAR_SETTINGS = {
    'TITLE': 'Marketify - Create a market for anything!',
    'DESCRIPTION': 'Decoupled Ecommerce Theme',
    'VERSION': '1.0.0',
}


CORS_ALLOWED_ORIGINS = [
    'http://localhost:5173',
    'http://192.168.1.102:5173',
    'http://192.168.1.102:3000',
    FRONTEND_DOMAIN,
   'https://marketify.up.railway.app',
    'https://marketify-backend.up.railway.app'
]

CORS_ALLOW_ALL_ORIGINS = False 

CORS_ALLOW_CREDENTIALS = True 

CORS_ALLOW_METHODS = [
    'GET',
    'POST',
    'PUT',
    'DELETE',
    'PATCH',
    'OPTIONS',
]

CSRF_TRUSTED_ORIGINS = [
    'http://localhost:5173',
    'http://192.168.1.102:5173',
    FRONTEND_DOMAIN,
   'https://marketify-backend.up.railway.app',
   'https://marketify.up.railway.app',
   'https://accounts.google.com'
]

CSRF_COOKIE_SAMESITE = 'Lax'  
CSRF_COOKIE_SECURE = True
SECURE_SSL_REDIRECT = True
SESSION_COOKIE_SECURE = True
X_FRAME_OPTIONS = 'DENY'
SECURE_HSTS_SECONDS = 31536000
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_HSTS_PRELOAD = True

if DEBUG:
    CSRF_COOKIE_SECURE = False


EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"

EMAIL_HOST= EMAIL_HOST
EMAIL_PORT= 587
EMAIL_USE_TLS= True
EMAIL_HOST_USER= EMAIL_USER
EMAIL_HOST_PASSWORD= EMAIL_PW


VERSATILEIMAGEFIELD_RENDITION_KEY_SETS = {
    'primary_image_detail': [
        ('hero', 'crop__600x283'),
        ('social', 'thumbnail__800x800')
    ],
    'product_grid_image': [
        ('list', 'crop__200x200'),
        ('detail', 'crop__400x400'),
    ],
}

