# Generated by Django 5.1.2 on 2024-10-26 02:19

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('doctor', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='doctor',
            name='Birthday',
        ),
        migrations.RemoveField(
            model_name='doctor',
            name='City',
        ),
        migrations.RemoveField(
            model_name='doctor',
            name='First_name',
        ),
        migrations.RemoveField(
            model_name='doctor',
            name='Last_name',
        ),
        migrations.RemoveField(
            model_name='doctor',
            name='NIC',
        ),
        migrations.RemoveField(
            model_name='doctor',
            name='Other_name',
        ),
        migrations.RemoveField(
            model_name='doctor',
            name='Postal_Code',
        ),
        migrations.RemoveField(
            model_name='doctor',
            name='Street_Name',
        ),
        migrations.RemoveField(
            model_name='doctor',
            name='Street_No',
        ),
    ]
