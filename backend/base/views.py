
from .models import GlobalSiteContent
from .serializers import GlobalSiteContentSerializer
from typing import Any
from django.shortcuts import render, get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import api_view
from drf_spectacular.utils import extend_schema
from rest_framework.permissions import IsAuthenticated, AllowAny
# from rest_framework_simplejwt.tokens import RefreshToken
import requests
from rest_framework.response import Response
from django.shortcuts import redirect
from django.http import HttpResponse
# from accountprofile.models import CustomAccountProfile
# from .utils import get_random_string
# import uuid
from django.utils.html import escape
import json
from django.core.mail import send_mail

@extend_schema(responses=GlobalSiteContentSerializer)
class GlobalSiteContentViewSet(viewsets.ModelViewSet):
    queryset = GlobalSiteContent.objects.all()
    serializer_class = GlobalSiteContentSerializer
    permission_classes = [AllowAny]
    def list(self, request):
        print('??')
        serializer = self.get_serializer(self.queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, *args, **kwargs):
        print('retrived footer', self.kwargs)
        lookup_value = self.kwargs.get('slug') 
        GlobalSiteContent = get_object_or_404(self.queryset, slug=lookup_value)     
        print('retrived footer', lookup_value, GlobalSiteContent)
                  
        serializer = self.get_serializer(GlobalSiteContent)

        return Response({
            'content': serializer.data,
        })
    
@csrf_exempt
@api_view(['POST'])
def handle_email(req):
    try:
        req_data = json.loads(req.body.decode('utf-8'))
        email_data = req_data['formData']
        name = escape(email_data['name'])
        email = escape(email_data['email'])
        message = escape(email_data['message'])
        subject = f'Marketify message from: {name} - {email}'

        send_mail(
            subject,
            message,
            email,
            ["cucullen111@gmail.com"],
            fail_silently=False,
        )
        return Response({'Sent' : [subject, message, email]}, status=201)

    except (json.JSONDecodeError, AttributeError) as e:
        print("Error:", e)
        return HttpResponse("Invalid data", status=400)

