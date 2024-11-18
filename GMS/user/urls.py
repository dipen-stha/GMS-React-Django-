from django.urls import path
from rest_framework.routers import DefaultRouter
from . views import SignUpView, UserView

router = DefaultRouter()
router.register(r'signup', SignUpView, basename='signup')
router.register(r'get_user', UserView, basename='get_user')
urlpatterns = router.urls
