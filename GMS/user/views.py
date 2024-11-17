from django.contrib.auth import get_user_model

from rest_framework.response import Response
from rest_framework.generics import  RetrieveAPIView
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status

from . models import BaseUser

from . serializers import UserSerializer

User = get_user_model()

class UserView(ModelViewSet):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user

        if user.is_staff & user.is_superuser:
            return User.objects.all()
        return User.objects.filter(id=user.id)
    

class SignUpView(ModelViewSet):
    queryset = []
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({
                "message": "User Created Successfully",
                "username": user.username
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
