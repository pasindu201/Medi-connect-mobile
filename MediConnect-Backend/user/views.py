from .models import User
from .serializers import UserSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from django.contrib.auth.hashers import make_password, check_password
from django.http import JsonResponse


@api_view(['GET'])
def get_users(request):
    users = User.objects.all()  # Get all users
    serializer = UserSerializer(users, many=True)  
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['POST'])
def user_login(request):
    data = request.data
    try:
        # Check if the user exists by email
        user = User.objects.get(Email=data['Email'])

        # Check if the provided password matches the stored hashed password
        if data['Password'] == user.Password:
            serializer = UserSerializer(user)
            return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({"status": "error" }, status=status.HTTP_400_BAD_REQUEST)
    except User.DoesNotExist:
        return Response({"status": "error", "message": "User not found"}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def create_user(request):
    # Deserialize and validate the incoming data
    serializer = UserSerializer(data=request.data)

    if serializer.is_valid():
        # If data is valid, save the new user
        serializer.save()
        return Response({"status": "success"}, status=status.HTTP_201_CREATED)
    else:
        # Return error if validation fails
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_user_by_id(request, pk):
    try:
        user = User.objects.get(User_ID=pk)
        serializer = UserSerializer(user, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except User.DoesNotExist:
        return Response({"status": "error", "message": "User not found"}, status=status.HTTP_404_NOT_FOUND)


@api_view(['PUT'])
def update_user_registration_status(request, pk):
    try:
        # Retrieve the user by their User_ID (pk)
        user = User.objects.get(User_ID=pk)
    except User.DoesNotExist:
        return Response({"status": "error", "message": "User not found"}, status=status.HTTP_404_NOT_FOUND)

    # Update the IsRegistered field to True
    user.IsRegistered = True 
    user.save() 

    serializer = UserSerializer(user)  
    return Response(
        {
            "status": "success",
            "data": serializer.data,
            "message": "User registration status updated to True"
        },
        status=status.HTTP_200_OK
    )

@api_view(['GET'])
def number_of_users(request):
    user_count = User.objects.count()
    return Response({'users_count': user_count})
