from django.db import models

# Create your models here.
class MedicalRecord(models.Model):
    Patient_ID = models.ForeignKey('patient.Patient', on_delete=models.CASCADE)
    Record_ID = models.BigAutoField(primary_key=True)
    Doctor_Name = models.TextField()
    Date = models.DateField()
    Description = models.TextField()
    Diagnosis = models.TextField()
    medicines = models.JSONField(default=list) 

    class Meta:
        db_table = 'medical_records'

    def __str__(self):
        return str(self.Record_ID)