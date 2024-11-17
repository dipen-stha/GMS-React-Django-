from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.utils.translation import gettext_lazy as _

from common.constants import GENDER_CHOICES
from . managers import CustomUserManager
# Create your models here.
class BaseUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(_("Email Address"), unique=True, max_length=255)
    username = models.CharField(_("Username"), unique=True, max_length=100)
    first_name = models.CharField(_("First Name"), max_length=200)
    last_name = models.CharField(_("Last Name"), max_length=200)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(auto_now_add=True)
    last_login = models.DateTimeField(auto_now=True)
    profile_pic = models.ImageField(upload_to='media/users/', null=True)
    gender = models.CharField(choices=GENDER_CHOICES)

    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = ['email','first_name', 'last_name']

    objects = CustomUserManager()

    def __str__(self):
        return self.email