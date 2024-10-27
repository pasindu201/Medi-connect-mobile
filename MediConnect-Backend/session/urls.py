from django.urls import path
from . import views

urlpatterns = [
    # Get a list of sessions by patient ID
    path('sessions/patient/<int:patient_id>/', views.get_sessions_by_patient),

    # Create a new sessio
    path('sessions/create/', views.create_session),

    # Delete a session by session ID
    path('sessions/delete/<int:session_id>/', views.delete_session),

    # Get a list of sessions by doctor ID
    path('sessions/doctor/<int:doctor_id>/', views.get_sessions_by_doctor),

    # Get a list of sessions by doctor ID and hospital ID
    path('sessions/doctor/<int:doctor_id>/hospital/<int:hospital_id>/', views.get_sessions_by_doctor_and_hospital),
]
