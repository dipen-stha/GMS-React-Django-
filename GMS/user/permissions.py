from rest_framework.permissions import BasePermission

def is_superuser(user):
    if user.is_superuser & user.is_staff:
        return True
    return False