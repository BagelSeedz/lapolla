from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
# router.register(r'users', views.UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('me/', views.me, name='me'),
    path('register_user/', views.register_user, name='register'),
    path('login_user/', views.login_user, name='login'),
]