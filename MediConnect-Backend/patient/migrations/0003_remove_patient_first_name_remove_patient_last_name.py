# Generated by Django 5.1.2 on 2024-10-26 01:53

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('patient', '0002_remove_patient_nic_patient_birthday'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='patient',
            name='First_name',
        ),
        migrations.RemoveField(
            model_name='patient',
            name='Last_name',
        ),
    ]
