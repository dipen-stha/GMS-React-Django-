from django.db import models

from common.models import BaseCreation, BaseSlug
from django.contrib.auth import get_user_model

# Create your models here.

User = get_user_model()

class Gym(BaseSlug, BaseCreation):
    address = models.CharField(max_length=255)
    description = models.TextField(null=True)
    manager = models.ForeignKey(User, on_delete=models.SET_NULL, related_name="gyms", null=True)
    image = models.ImageField(upload_to='users/', default='users/default.jpg')

    def __str__(self):
        return self.name

