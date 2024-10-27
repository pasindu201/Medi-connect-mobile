from django.db import models

# Create your models here.
class Session(models.Model):
    Session_ID = models.BigAutoField(primary_key=True)  # Big integer auto-increment field for the primary key
    Patient_ID = models.BigIntegerField()  # Patient ID as a big integer
    Doctor_ID = models.BigIntegerField()  # User ID as a big integer
    Date = models.DateField()  # Date stored as date
    Time = models.TimeField()  # Time stored as time
    Hospital_id = models.BigIntegerField()  

    def __str__(self):
        return str(self.Session_ID)
    
    class Meta:
        db_table = 'sessions'   

def __str__(self):
    return str(self.Session_ID)    
