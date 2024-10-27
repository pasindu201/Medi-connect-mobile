from django.urls import path
from . import views

urlpatterns = [
    path('patient', views.get_all_patients),
    path('patient/count/', views.number_of_patients),
    path('patient/create/', views.create_patient),
    path('patient/byID/<str:pk>/', views.get_patient_by_id),
    path('patient/byGender/', views.paients_by_gender),
    path('patient/byAge/', views.patients_by_age),
]