# Generated by Django 5.1.3 on 2025-01-28 09:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('auth_api', '0003_user_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='image',
            field=models.ImageField(max_length=255, null=True, upload_to='employees'),
        ),
    ]
