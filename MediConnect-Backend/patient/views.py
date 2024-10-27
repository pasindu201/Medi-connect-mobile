from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from django.http import JsonResponse
from user.models import User
from .models import Patient
from .serializers import PatientSerializer

@api_view(['POST'])
def create_patient(request):
    data = request.data  # This should be a JSON object

    # Validate the incoming JSON data
    required_fields = ['User_ID', 'Birthday', 
                       'Street_No', 'Street_Name', 'District', 'Postal_Code', 
                       'Breakfast_time', 'Lunch_time', 'Dinner_time']
    
    for field in required_fields:
        if field not in data:
            return Response({"status": "error", "message": f"'{field}' is required"}, 
                            status=status.HTTP_400_BAD_REQUEST)

    # Check if the user associated with this patient already exists
    user = get_object_or_404(User, User_ID=data['User_ID'])

    # Check if a patient already exists for this user
    if Patient.objects.filter(User_ID=user).exists():
        return Response({"status": "error", "message": "Patient already exists for this user"}, 
                        status=status.HTTP_400_BAD_REQUEST)

    # Create a new patient
    patient = Patient.objects.create(
        User_ID=user,
        Gender=data.get('Gender'), 
        Birthday=data['Birthday'],
        Street_No=data['Street_No'],
        Street_Name=data['Street_Name'],
        District=data['District'],
        Province=data.get('Province'),  
        Postal_Code=data['Postal_Code'],
        Breakfast_time=data['Breakfast_time'],
        Lunch_time=data['Lunch_time'],
        Dinner_time=data['Dinner_time']
    )

    # Serialize and return the response
    serializer = PatientSerializer(patient)
    return Response({"status": "success", "data": serializer.data, "message": "Patient created successfully"}, 
                    status=status.HTTP_201_CREATED)

# Get a patient by ID
@api_view(['GET'])
def get_patient_by_id(request, pk):
    try:
        patient = Patient.objects.get(Patient_ID=pk)
        serializer = PatientSerializer(patient, many=False)
        return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)
    except Patient.DoesNotExist:
        return Response({"status": "error", "message": "Patient not found"}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def get_all_patients(request):
    hospitals = Patient.objects.all()
    serializer = PatientSerializer(hospitals, many=True)
    return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)


# Update a patient
@api_view(['PUT'])
def update_patient(request, pk):
    try:
        patient = Patient.objects.get(Patient_ID=pk)
    except Patient.DoesNotExist:
        return Response({"status": "error", "message": "Patient not found"}, status=status.HTTP_404_NOT_FOUND)

    data = request.data
    serializer = PatientSerializer(instance=patient, data=data, partial=True)  # Use partial=True for partial updates

    if serializer.is_valid():
        serializer.save()
        return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)

    return Response({"status": "error", "message": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


# Delete a patient
@api_view(['DELETE'])
def delete_patient(request, pk):
    try:
        patient = Patient.objects.get(Patient_ID=pk)
        patient.delete()
        return Response({"status": "success", "message": "Patient deleted successfully"},
                        status=status.HTTP_204_NO_CONTENT)
    except Patient.DoesNotExist:
        return Response({"status": "error", "message": "Patient not found"}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def number_of_patients(request):
    patient_count = Patient.objects.count()
    return Response({'patients_count': patient_count})

@api_view(['GET'])
def paients_by_gender(request):
    patines = Patient.objects.all()
    gender = {"Male":0, "Female":0}

    for patient in patines:
        if patient.Gender == "Male":
            gender["Male"] += 1
        elif patient.Gender == "Female":
            gender["Female"] += 1
    
    return JsonResponse(gender, status=200) 

@api_view(['GET'])
def patients_by_age(request):
    patients = Patient.objects.all()
    
    # Initialize age groups for ages 1-100
    age_groups = {str(age): 0 for age in range(1, 101)}

    for patient in patients:
        age = patient.get_age()
        if 1 <= age <= 100:
            age_groups[str(age)] += 1

    return JsonResponse(age_groups, status=200)