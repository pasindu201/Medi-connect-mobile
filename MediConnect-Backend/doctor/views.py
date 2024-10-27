from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from hospital.models import Hospital
from hospital.serializers import HospitalSerializer
from user.models import User
from .models import Doctor
from .serializers import DoctorSerializer
import os
from django.http import JsonResponse

@api_view(['POST'])
def create_doctor(request):
    data = request.data

    # Check if the user exists using User_ID
    if not User.objects.filter(User_ID=data['User_ID']).exists():
        return Response({"error": "User does not exist."}, status=400)

    # Check if a doctor already exists for this user
    if Doctor.objects.filter(User_ID=data['User_ID']).exists():
        return Response({"status": "error", "message": "Doctor already exists for this user"},
                        status=status.HTTP_400_BAD_REQUEST)

    # Handle file uploads (ID_photo)
    id_photo = request.FILES.get('ID_photo', None)  # This will handle the image if uploaded

    # Create a new doctor
    doctor = Doctor.objects.create(
        User_ID=get_object_or_404(User, User_ID=data['User_ID']),
        Specialization=data['Specialization'],
        Reg_num=data['Reg_num'],
        Rating=data.get('Rating', None),
        Current_HOS=data.get('Current_HOS', None),
        Availability=data.get('Availability', True),
        ID_photo=id_photo  # Assign the uploaded image
    )

    # Serialize and return the response
    serializer = DoctorSerializer(doctor)
    return Response({"status": "success", "data": serializer.data, "message": "Doctor created successfully"},
                    status=status.HTTP_201_CREATED)


# Get a doctor by ID
@api_view(['GET'])
def get_doctor_by_id(request, pk):
    try:
        doctor = Doctor.objects.get(Doctor_ID=pk)
        serializer = DoctorSerializer(doctor, many=False)
        return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)
    except Doctor.DoesNotExist:
        return Response({"status": "error", "message": "Doctor not found"}, status=status.HTTP_404_NOT_FOUND)


# Get all doctors
@api_view(['GET'])
def get_all_doctors(request):
    # Retrieve all doctors from the database
    doctors = Doctor.objects.all()
    doctor_list = []
    for doctor in doctors:
        doctor_list.append({
            "Doctor_ID": doctor.Doctor_ID,
            "User_ID": doctor.User_ID.User_ID,
            "Name": doctor.User_ID.First_name + " " + doctor.User_ID.Last_name,
            "Specialization": doctor.Specialization,
            "Reg_num": doctor.Reg_num,
            "Rating": doctor.Rating,
            "Current_HOS": doctor.Current_HOS,
            "Availability": doctor.Availability,
            "ID_photo": doctor.ID_photo.url if doctor.ID_photo else None
        })
       
    return JsonResponse({"status":"success", "data": doctor_list}, status=status.HTTP_200_OK)


@api_view(['PUT'])
def update_doctor(request, user_id):
    # Retrieve the doctor instance by User_ID
    doctor = get_object_or_404(Doctor, User_ID=user_id)

    # Get data from the request
    data = request.data

    # Update the doctor's details
    doctor.Specialization = data.get('Specialization', doctor.Specialization)
    doctor.Reg_num = data.get('Reg_num', doctor.Reg_num)
    doctor.Rating = data.get('Rating', doctor.Rating)
    doctor.Current_HOS = data.get('Current_HOS', doctor.Current_HOS)
    doctor.Availability = data.get('Availability', doctor.Availability)

    # Handle file uploads (ID_photo)
    id_photo = request.FILES.get('ID_photo', None)  # This will handle the image if uploaded
    if id_photo:
        doctor.ID_photo = id_photo  # Update the ID_photo if a new one is uploaded

    # Save the updated doctor instance
    doctor.save()

    # Serialize and return the response
    serializer = DoctorSerializer(doctor)
    return Response({"status": "success", "data": serializer.data, "message": "Doctor details updated successfully"},
                    status=status.HTTP_200_OK)


# Delete a doctor
@api_view(['DELETE'])
def delete_doctor(request, pk):
    try:
        doctor = Doctor.objects.get(Doctor_ID=pk)
        doctor.delete()
        return Response({"status": "success", "message": "Doctor deleted successfully"},
                        status=status.HTTP_204_NO_CONTENT)
    except Doctor.DoesNotExist:
        return Response({"status": "error", "message": "Doctor not found"}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def rate_doctor(request, pk):
    try:
        doctor = Doctor.objects.get(Doctor_ID=pk)
    except Doctor.DoesNotExist:
        return Response({"status": "error", "message": "Doctor not found"}, status=status.HTTP_404_NOT_FOUND)

    data = request.data
    doctor.Rating = data['Rating']
    doctor.save()

    serializer = DoctorSerializer(doctor)
    return Response({"status": "success", "data": serializer.data, "message": "Doctor rated successfully"},
                    status=status.HTTP_200_OK)