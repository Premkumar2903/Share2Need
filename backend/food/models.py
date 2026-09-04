from django.db import models
from django.conf import settings
from django.utils import timezone

# Create your models here.


class FoodListing(models.Model):

    #creating choices as class that can be reused
    class FoodType(models.TextChoices):
        VEGETARIAN  = 'VEGETARIAN', 'Vegetarian'
        NON_VEGETARIAN = 'NON_VEGETARIAN' ,'Non_Vegetarian'
        VEGAN = 'VEGAN' , 'Vegan'
        OTHER = 'OTHER' , 'Other'

    class Status(models.TextChoices):
        AVAILABLE = 'AVAILABLE' ,'Available'
        FULLY_RESERVED = "FULLY_RESERVED", "Fully Reserved"
        COMPLETED = "COMPLETED", "Completed"
        EXPIRED = 'EXPIRED' , 'Expired'
        CANCELLED = 'CANCELLED' , 'Cancelled'


    def update_status(self):

        now = timezone.now()
        #updating expired status
        if now> self.available_until:
            self.status = self.status.EXPIRED

        else:
            reserved_quantity = self.reservations.filter(
                status = FoodReservation.Status.RESERVED
            ).aggregate(
                total = models.Sum('quantity')
            )['total'] or 0

            remaining_quantity = self.quantity - reserved_quantity

            if remaining_quantity > 0:
                self.status = self.Status.AVAILABLE # if quantiy more than 1
            else:
                self.status = self.Status.FULLY_RESERVED #quantiy is 0

            self.save(update_fields=['status'])



    #only donors do food list
    donor = models.ForeignKey(      #using user as donor
        settings.AUTH_USER_MODEL,     #refering accounts.User as AUTH_USER_MODEL
        on_delete=models.CASCADE,   # on deleting user , user post also deleted
        related_name='food_listings'
    )

    title = models.CharField(max_length=200)

    description = models.TextField(blank=True)

    food_type = models.CharField(max_length=20, choices=FoodType.choices)

    quantity = models.PositiveBigIntegerField()

    unit = models.CharField(max_length=30 , default='meals')

    available_from = models.DateTimeField()

    available_until = models.DateTimeField()

    pickup_address = models.TextField()
    

    # -90 to 90
    latitude = models.DecimalField(
        max_digits=9,
        decimal_places=6,  
        null= True,
        blank= True
    )

    # -180 to 180
    longitude = models.DecimalField(
        max_digits=9, 
        decimal_places=6,  #logitude can have 3 digits sample logitude (170.238322)
        null=True,
        blank=True
    )

    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default= Status.AVAILABLE
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title




class FoodReservation(models.Model):
    class Status(models.TextChoices):
       RESERVED= "RESERVED", 'Reserved'
       COMPLETED = 'COMPLETED', 'Completed'
       CANCELLED = 'CANCELLED', 'Cancelled'


    food = models.ForeignKey(
        FoodListing,                
        on_delete=models.CASCADE,
        related_name='reservations'
    )

    receiver = models.ForeignKey(
        settings.AUTH_USER_MODEL,           #getting receiver name
        on_delete=models.CASCADE,
        related_name = 'food_reservations',
    )

    #added quantity so that we can split and claim 50 - 10 - 20 = 20 remaining
    quantity = models.PositiveIntegerField()

    status = models.CharField(
        max_length=20,
        choices= Status.choices,
        default=Status.RESERVED
    )

    reserved_at = models.DateTimeField(
        null=True,
        blank=True
    )

    completed_at = models.DateTimeField(
        null=True,
        blank=True
    )

    def __str__(self):
        return f'{self.food.title} - {self.receiver.username}'