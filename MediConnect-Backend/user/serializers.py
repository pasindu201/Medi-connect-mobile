from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

    # Validate email uniqueness
    def validate_Email(self, value):
        if User.objects.filter(Email=value).exists():
            raise serializers.ValidationError("A user with this email already exists.")
        return value

