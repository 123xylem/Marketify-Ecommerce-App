from django.shortcuts import get_object_or_404, redirect, render
from product.models import *
from django.contrib.auth.mixins import LoginRequiredMixin

from rest_framework.response import Response
from rest_framework import viewsets, status
from .serializers import AccountProfileSerializer
from product.serializers import ProductSerializer
from .models import AccountProfile
import pprint
from drf_spectacular.utils import extend_schema
from django.contrib.auth.decorators import login_required
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action

@extend_schema(responses=AccountProfileSerializer)
class AccountViewSet(viewsets.ModelViewSet):
  queryset = AccountProfile.objects.all()
  serializer_class = AccountProfileSerializer(queryset)

  # def create(self, req):
  #   account = AccountProfile.create(user=req.user)

