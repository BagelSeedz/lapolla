from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
# router.register(r'users', views.UserViewSet)

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()

urlpatterns = [
    path('', include(router.urls)),
    path('csrf/', views.csrf, name='csrf'),
    path('me/', views.me, name='me'),
    path('register_user/', views.register_user, name='register'),
    path('login_user/', views.login_user, name='login'),
    path("logout_user/", views.logout_user, name='logout'),
    path("predict/", views.predict, name='predict'),
    path("sheets/my/", views.my_sheets, name="my_sheets"),
    path("sheets/other/", views.other_sheets, name="other_sheets"),
    path("sheets/create/", views.create_sheet, name="create_sheet"),
    path("sheets/count/", views.submitted_count, name="submitted_count"),
    path("sheets/submit/", views.submit, name="submit"),
    path("sheets/unsubmit/", views.unsubmit, name="unsubmit"),
    path("sheets/export/<int:sheet_id>/", views.export_sheet, name="export"),
    path("announcement/", views.announcement, name="announcement")
]
