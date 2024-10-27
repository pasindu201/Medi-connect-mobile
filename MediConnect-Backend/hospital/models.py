from django.db import models

class Hospital(models.Model):
    Hospital_ID = models.BigAutoField(primary_key=True)
    Location = models.CharField(max_length=100)
    Rating = models.FloatField()
    Name = models.CharField(max_length=255)

    class Meta:
        db_table = 'hospitals'   

def __str__(self):
    return str(self.Hospital_ID)    