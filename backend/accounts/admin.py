from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import User


# Register your models here.

@admin.register(User)
class CustomUserAdmin(UserAdmin):

        #adding custom user field to admin
        fieldsets = UserAdmin.fieldsets + (
            (
                "Additional Information",
                {
                    "fields": (
                        "role",
                        "phone",
                    )
                },
            ),
        )

        add_fieldsets = UserAdmin.add_fieldsets + (
            (
                "Additional Information",
                {
                    "fields": (
                        "role",
                        "phone",
                    )
                },
            ),
        )