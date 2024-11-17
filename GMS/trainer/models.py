from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

# Create your models here.
class Trainer(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    # gym = models.ForeignKey(Gym, on_delete=models.SET_NULL, null=True, related_name="trainers")
    expertise = models.CharField(max_length=255)

    def __str__(self):
        return 'f{self.fname}'