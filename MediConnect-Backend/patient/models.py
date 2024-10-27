from django.db import models
from user.models import User
from datetime import date

class Patient(models.Model):
    User_ID = models.OneToOneField(User, on_delete=models.CASCADE, unique=True)
    Patient_ID = models.BigAutoField(primary_key=True)

    Gender = models.CharField(max_length=255)

    Street_No = models.CharField(max_length=255)
    Street_Name = models.CharField(max_length=255)
    District = models.CharField(max_length=255)
    Province = models.CharField(max_length=255, blank=True, null=True)
    Postal_Code = models.CharField(max_length=255)
   
    Birthday = models.DateField(default='1970-01-01', null=True) 
    Breakfast_time = models.CharField(max_length=255)
    Lunch_time = models.CharField(max_length=255)
    Dinner_time = models.CharField(max_length=255)

    def get_age(self):
        if self.Birthday:
            today = date.today()
            age = today.year - self.Birthday.year - ((today.month, today.day) < (self.Birthday.month, self.Birthday.day))
            return age
        return None 

    class Meta:
        db_table = 'patients'   

def __str__(self):
    return str(self.Patient_ID)    