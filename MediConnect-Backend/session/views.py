
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .models import Session
from .serializers import SessionSerializer
from rest_framework.decorators import api_view


@api_view(['GET'])
def get_sessions_by_patient(request, patient_id):
    try:
        # Filter sessions by the patient ID
        sessions = Session.objects.filter(Patient_ID=patient_id)
        
        # If no sessions found, return an appropriate message
        if not sessions.exists():
            return Response({"message": "No sessions found for this patient."}, status=status.HTTP_404_NOT_FOUND)

        # Serialize the session data
        serializer = SessionSerializer(sessions, many=True)

        # Return the serialized data
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    except Exception as e:
        # Handle unexpected errors
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
def create_session(request):
    # Deserialize the data
    serializer = SessionSerializer(data=request.data)

    # Check if the data is valid
    if serializer.is_valid():
        # Save the session to the database
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    # Return a 400 response if the data is invalid
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def delete_session(request, session_id):
    try:
        # Try to find the session by its ID
        session = Session.objects.get(Session_ID=session_id)
        
        # Delete the session
        session.delete()
        
        # Return a 204 No Content status indicating the session was successfully deleted
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    except Session.DoesNotExist:
        # If the session doesn't exist, return a 404 response
        return Response({"error": "Session not found"}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def get_sessions_by_doctor(request, doctor_id):
    try:
        # Filter sessions by the doctor ID
        sessions = Session.objects.filter(Doctor_ID=doctor_id)
        
        # If no sessions found, return an appropriate message
        if not sessions.exists():
            return Response({"message": "No sessions found for this doctor."}, status=status.HTTP_404_NOT_FOUND)

        # Serialize the session data
        serializer = SessionSerializer(sessions, many=True)

        # Return the serialized data
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    except Exception as e:
        # Handle unexpected errors
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
@api_view(['GET'])
def get_sessions_by_doctor_and_hospital(request, doctor_id, hospital_id):
    try:
        # Filter sessions by the doctor ID and hospital ID
        sessions = Session.objects.filter(Doctor_ID=doctor_id, Hospital_id=hospital_id)
        
        # If no sessions found, return an appropriate message
        if not sessions.exists():
            return Response({"message": "No sessions found for this doctor in the specified hospital."}, status=status.HTTP_404_NOT_FOUND)

        # Serialize the session data
        serializer = SessionSerializer(sessions, many=True)

        # Return the serialized data
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    except Exception as e:
        # Handle unexpected errors
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)    