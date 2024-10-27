from django.db import models

# Create your models here.
class User(models.Model):
    User_ID = models.BigAutoField(primary_key=True)  # Big integer auto-increment field for the primary key
    Username = models.CharField(max_length=255, null=True)  # Username as a varchar
    Role = models.CharField(max_length=255, null=True)  # Role as a varchar
    Email = models.EmailField(null=True)  # Email field to store email addresses
    Mobile = models.CharField(max_length=255, null=True)  # Mobile number stored as varchar
    Password = models.CharField(max_length=255, null=True)  # Password stored as varchar
    NIC = models.CharField(max_length=255, null=True)  # National Identity Card (NIC) stored as varchar
    Device_ID = models.CharField(max_length=255, null=True)  # Device ID stored as varchar
    First_name = models.CharField(max_length=255, default='unknown', null=True)  # First name stored as varchar
    Last_name = models.CharField(max_length=255, default='unknown', null=True)  # Last name stored as varchar

    class Meta:
        db_table = 'users'   

def __str__(self):
    return str(self.User_ID)    