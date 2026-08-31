from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.


#extending Django's existing User by AbstractUser (id,username,password,email,is_staff,... 
# we will have our custom fields to user role,phone,...)


class User(AbstractUser):

    class Role(models.TextChoices):
        DONOR = 'DONOR', 'Donor'
        RECEIVER = 'RECEIVER', 'receiver'

    role = models.CharField(
        max_length=20, choices=Role.choices
    )

    phone = models.CharField(max_length=15,blank=True)

    #creates and updates current now time 
    created_at = models.DateTimeField(auto_now_add=True)

    #updates current time
    updated_at = models.DateTimeField(auto_now=True)