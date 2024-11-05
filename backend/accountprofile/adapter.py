from allauth.account.adapter import DefaultAccountAdapter
from django.conf import settings
from django.shortcuts import resolve_url
from base.utils import *
from django.utils import timezone
class AccountAdapter(DefaultAccountAdapter):

    def get_login_redirect_url(self, request):
        threshold = 90 #seconds
        ip = request.META.get('HTTP_X_FORWARDED_FOR')
        if ip:
            ip = ip.split(',')[0]
        else:
            ip = request.META.get('REMOTE_ADDR')
        url = settings.LOGIN_REDIRECT_URL + '&emid_code='+encrypt_email(f'{request.user.email} --- {timezone.now()} --- {ip}')
        return resolve_url(url)
    
    #Edit login redirect URL for all types of Signups/Logins
    def get_signup_redirect_url(self, request):
        return self.get_login_redirect_url(request)

    def get_social_login_redirect_url(self, request, sociallogin):
        return self.get_login_redirect_url(request)
