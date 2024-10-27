from django.db import models
from user.models import User

class Doctor(models.Model):
    User_ID = models.OneToOneField(User, on_delete=models.CASCADE, unique=True)
    Doctor_ID = models.BigAutoField(primary_key=True)

    Reg_num = models.CharField()
    Specialization = models.CharField(max_length=255)
    Rating = models.FloatField(null=True)

    Current_HOS = models.CharField(max_length=255, null=True)
    Availability = models.BooleanField(default=True)
    ID_photo = models.ImageField(upload_to='doctor_photos/', null=True, blank=True)

    class Meta:
        db_table = 'doctors'   

def __str__(self):
    return str(self.Doctor_ID)    