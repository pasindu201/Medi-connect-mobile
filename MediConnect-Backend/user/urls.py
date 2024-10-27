from django.urls import path
from . import views

urlpatterns = [
    path('users/', views.get_users),
    path('users/count/', views.number_of_users),
    path('users/create/', views.create_user),
    path('users/login/', views.user_login),
    path('users/byID/<str:pk>/', views.get_user_by_id),
    path('users/<int:pk>/update-registration/', views.update_user_registration_status),
]
