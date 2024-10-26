# Generated by Django 5.1.2 on 2024-10-26 01:29

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('User_ID', models.BigAutoField(primary_key=True, serialize=False)),
                ('Username', models.CharField(max_length=255, null=True)),
                ('Role', models.CharField(max_length=255, null=True)),
                ('Email', models.EmailField(max_length=254, null=True)),
                ('Password', models.CharField(max_length=255, null=True)),
                ('NIC', models.CharField(max_length=255, null=True)),
                ('Device_ID', models.CharField(max_length=255, null=True)),
                ('Birthday', models.DateField(default='1970-01-01', null=True)),
                ('First_name', models.CharField(default='unknown', max_length=255, null=True)),
                ('Last_name', models.CharField(default='unknown', max_length=255, null=True)),
            ],
            options={
                'db_table': 'users',
            },
        ),
    ]
