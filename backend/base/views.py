
from .models import GlobalSiteContent
from .serializers import GlobalSiteContentSerializer
from typing import Any
from django.shortcuts import render, get_object_or_404

from rest_framework import viewsets
from rest_framework.response import Response
from drf_spectacular.utils import extend_schema
from rest_framework.permissions import IsAuthenticated, AllowAny


@extend_schema(responses=GlobalSiteContentSerializer)
class GlobalSiteContentViewSet(viewsets.ModelViewSet):
    queryset = GlobalSiteContent.objects.all()
    serializer_class = GlobalSiteContentSerializer
    permission_classes = [AllowAny]
    def list(self, request):
        serializer = self.get_serializer(self.queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, *args, **kwargs):

        lookup_value = self.kwargs.get('slug') 
        GlobalSiteContent = get_object_or_404(self.queryset, slug=lookup_value)     
                                        
        serializer = self.get_serializer(GlobalSiteContent)

        return Response({
            'content': serializer.data,
        })
