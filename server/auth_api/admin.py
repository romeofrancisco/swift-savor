from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.translation import gettext_lazy as _
from .models import User

class CustomUserAdmin(BaseUserAdmin):
    fieldsets = (
        (None, {"fields": ("email", "password")}),
        (_("Personal info"), {"fields": ("image","username", "first_name", "last_name")}),
        (_("Permissions"), {"fields": ("is_active", "is_staff", "is_superuser", "role", "groups", "user_permissions")}),
        (_("Important dates"), {"fields": ("last_login", "date_joined")}),
    )
    add_fieldsets = (
        (None, {
            "classes": ("wide",),
            "fields": ("image","email", "username","first_name", "last_name", "role", "password1", "password2"),
        }),
    )
    list_display = ("email", "username", "role", "is_staff", "is_superuser")
    search_fields = ("email", "username","first_name", "last_name")
    ordering = ("email",)

    def save_model(self, request, obj, form, change):
        if obj.role == User.Role.admin:
            obj.is_staff = True
            obj.is_superuser = True
        elif obj.role == User.Role.manager:
            obj.is_staff = True
            obj.is_superuser = False
        elif obj.role == User.Role.employee:
            obj.is_staff = False
            obj.is_superuser = False

        # Hash the password if it's not hashed already
        if form.cleaned_data.get('password') and not obj.password.startswith('pbkdf2_'):
            obj.set_password(obj.password)

        super().save_model(request, obj, form, change)

# Register the custom user admin
admin.site.register(User, CustomUserAdmin)