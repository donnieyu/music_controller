# Generated by Django 4.0.3 on 2022-04-06 15:46

import api.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_alter_room_created_at'),
    ]

    operations = [
        migrations.AlterField(
            model_name='room',
            name='code',
            field=models.CharField(auto_created=True, default=api.models.generate_unique_code, max_length=8, unique=True),
        ),
    ]
