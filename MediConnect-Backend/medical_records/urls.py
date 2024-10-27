from django.urls import path
from . import views

urlpatterns = [
    path('medical-records/<int:pk>/', views.get_all_medical_records),
    path('medical-records/create/', views.create_medical_record),
    path('districts/<diagnosis>/', views.get_diagnosis_by_district),
    path('provinces/<diagnosis>/', views.get_diagnosis_by_province),
    path('medicines/', views.get_diagnosis_by_medicine),
]
