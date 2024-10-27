from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from .models import MedicalRecord
from user.models import User  
import json
from patient.models import Patient

# Function to create a medical record
@api_view(['POST'])
def create_medical_record(request):
    try:
        data = json.loads(request.body)
        patient_id = data.get('Patient_ID')
        doctor_name = data.get('Doctor_Name')
        date = data.get('Date')
        description = data.get('Description')
        diagnosis = data.get('Diagnosis')
        medicines = data.get('medicines', [])

        # Fetch the User instance based on the provided Patient_ID (User_ID)
        patient = get_object_or_404(Patient, Patient_ID=patient_id)

        # Create a new MedicalRecord instance
        medical_record = MedicalRecord.objects.create(
            Patient_ID=patient,
            Doctor_Name=doctor_name,
            Date=date,
            Description=description,
            Diagnosis=diagnosis,
            medicines=medicines
        )

        return JsonResponse({
            "message": "Medical record created successfully",
            "record_id": medical_record.Record_ID
        }, status=201)

    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON format"}, status=400)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)


# Function to retrieve all medical records by User_ID
@api_view(['GET'])
def get_all_medical_records(request, pk):
    try:
        # Fetch the User instance based on the provided User_ID
        user = get_object_or_404(User, User_ID=pk)

        # Fetch all medical records for the user
        medical_records = MedicalRecord.objects.filter(Patient_ID=user)

        # Serialize the medical records into a list of dictionaries
        records_data = []
        for record in medical_records:
            records_data.append({
                "Record_ID": record.Record_ID,
                "Doctor_Name": record.Doctor_Name,
                "Date": record.Date,
                "Description": record.Description,
                "Diagnosis": record.Diagnosis,
                "medicines": record.medicines
            })

        return JsonResponse({
            "user_id": pk,
            "medical_records": records_data
        }, status=200)

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
    
@api_view(['GET'])
def get_diagnosis_by_district(request, diagnosis):
    try:
        medical_records = MedicalRecord.objects.filter(Diagnosis=diagnosis)
        district_data = {
            "Ampara": 0, "Anuradhapura": 0, "Badulla": 0, "Batticaloa": 0, "Colombo": 0, "Galle": 0, "Gampaha": 0, 
            "Hambantota": 0, "Jaffna": 0, "Kalutara": 0, "Kandy": 0, "Kegalle": 0, "Kilinochchi": 0, "Kurunegala": 0, 
            "Mannar": 0, "Matale": 0, "Matara": 0, "Monaragala": 0, "Mullaitivu": 0, "Nuwara Eliya": 0, "Polonnaruwa": 0, 
            "Puttalam": 0, "Ratnapura": 0, "Trincomalee": 0, "Vavuniya": 0
        }

        for record in medical_records:
            patient = record.Patient_ID  
            city = patient.District  
            if city in district_data:
                district_data[city] += 1

        return JsonResponse({
            "diagnosis": diagnosis,
            "district_data": district_data
        }, status=200)

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)

@api_view(['GET'])
def get_diagnosis_by_province(request, diagnosis):
    try:
        medical_records = MedicalRecord.objects.filter(Diagnosis=diagnosis)
        provinces_data = {
            "Western Province":0, "Central Province":0, "Southern Province":0, "Northern Province":0, "Eastern Province":0, "North Western Province":0, "North Central Province":0,
            "Uva Province":0, "Sabaragamuwa Province":0
        }

        for record in medical_records:
            patient = record.Patient_ID  
            province = patient.Province  
            if province in provinces_data:
                provinces_data[province] += 1

        return JsonResponse({
            "diagnosis": diagnosis,
            "district_data": provinces_data
        }, status=200)

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
    
@api_view(['GET'])
def get_diagnosis_by_medicine(request):  
    try:
        medical_records = MedicalRecord.objects.all()
        medicine_data = {}

        for record in medical_records:
            for medicine in record.medicines:
                medicine_name = medicine["name"]
                if medicine_name in medicine_data:
                    medicine_data[medicine_name] += 1
                else:
                    medicine_data[medicine_name] = 1

        return JsonResponse(medicine_data, status=200) 

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)