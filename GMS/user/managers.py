from django.contrib.auth.models import BaseUserManager
from django.core.validators import validate_email
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _

class CustomUserManager(BaseUserManager):
    def email_validation(self, email):
        try:
            validate_email(email)
        except ValidationError:
            raise ValueError(_("You must provide a valid email"))
    
    def clean_username(self, username):
        return username.lower()

    def create_user(self, email, username, first_name, last_name, password=None, **extra_fields):
        if not email:
            raise ValueError(_("This field is required"))
        else:
            self.email_validation(email)
            clean_email = self.normalize_email(email)
        
        if not username:
            raise ValueError("This field is required")
        else:
            # self.username_validation(username)
            clean_username = self.clean_username(username)
        
        if not first_name:
            raise ValueError(_("This field is required"))
        
        if not last_name:
            raise ValueError(_("This field is required"))
        
        user = self.model(
            email = clean_email,
            username = clean_username,
            first_name = first_name,
            last_name = last_name,
            **extra_fields
        )

        user.set_password(password)
        extra_fields.setdefault("is_superuser", False)
        extra_fields.setdefault("is_staff", False)
        user.save()
        return user
    

    def create_superuser(self, email, username, first_name, last_name, password=None, **extra_fields):

        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        if not email:
            raise ValueError(_("This field is required"))
        else:
            self.email_validation(email)
            clean_email = self.normalize_email(email)
        
        if not username:
            raise ValueError("This field is required")
        else:
            # self.username_validation(username)
            clean_username = self.clean_username(username)
        
        if not first_name:
            raise ValueError(_("This field is required"))
        
        if not last_name:
            raise ValueError(_("This field is required"))
        
        if extra_fields.get('is_superuser') is not True:
            raise ValueError(_("Superuser must have be a superuser"))
        if extra_fields.get('is_staff') is not True:
            raise ValueError(_("Superuser must be a staff"))
        
        user = self.create_user(clean_email, clean_username,first_name, last_name, password, **extra_fields )
        user.save()
        return user
