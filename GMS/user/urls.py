from django.urls import path
from rest_framework.routers import DefaultRouter
from . views import SignUpView, UserView

router = DefaultRouter()
router.register(r'signup', SignUpView, basename='signup')
router.register(r'user', UserView, basename='user')
urlpatterns = router.urls
