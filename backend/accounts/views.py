from django.shortcuts import render
from .serializers import RegisterSerializer
from rest_framework import generics
from rest_framework.permissions import AllowAny
# Create your views here.

class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]      #since register is firdt time user no permissions
    