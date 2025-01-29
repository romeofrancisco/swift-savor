from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.models import BaseUserManager

class CustomUserManager(BaseUserManager):
    def create_user(self, email, username, role, password=None, **extra_fields):
        if not email:
            raise ValueError("The Email field must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, username=username, role=role, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_admin(self, email, username, password=None, **extra_fields):
        """
        Creates and returns a superuser with admin role.
        """
        extra_fields.setdefault("role", "Admin")
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        return self.create_user(email, username, "Admin", password, **extra_fields)

    def create_manager(self, email, username, password=None, **extra_fields):
        """
        Creates and returns a staff user with manager role.
        """
        extra_fields.setdefault("role", "Manager")
        extra_fields.setdefault("is_staff", True)
        return self.create_user(email, username, "Manager", password, **extra_fields)

    def create_employee(self, email, username, password=None, **extra_fields):
        """
        Creates and returns a regular user with employee role.
        """
        extra_fields.setdefault("role", "Employee")
        extra_fields.setdefault("is_staff", False)
        return self.create_user(email, username, "Employee", password, **extra_fields)

class User(AbstractUser):
    class Role(models.TextChoices):
        admin = 'Admin'
        manager = 'Manager'
        employee = 'Employee'

    image = models.ImageField(upload_to='employees', max_length=255, null=True)
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=20, unique=True)
    role = models.CharField(choices=Role, default=Role.employee, max_length=10)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
    
    objects = CustomUserManager()

    def __str__(self) -> str:
        return self.email