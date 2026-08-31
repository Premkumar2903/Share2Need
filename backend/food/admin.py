from django.contrib import admin
from .models import FoodListing,FoodReservation

# Register your models here.


@admin.register(FoodListing)

class FoodListingAdmin(admin.ModelAdmin):
    list_display = (
        'title',
        'donor',
        'food_type',
        'status',
        'quantity',
        'available_until',
    )


    search_fields = (
        'title',
        'description',
        'pickup_address'
    )

    list_filter = (
        'food_type',
        'status'
    )

admin.site.register(FoodReservation)