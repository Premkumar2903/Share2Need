from rest_framework import serializers
from .models import User


class RegisterSerializer(serializers.ModelSerializer):

    password = serializers.CharField(
        write_only = True,  #client can send the password, but the API will never return it.
        min_length = 8  #Password must contain at least 8 characters.
    )

    #from user model taking fiels reqired for register
    class Meta:
        model = User
        fields = ['username','email','password','role','phone']

    #then by create function creating user 
    def create(self, validated_data):
        #create_user used to create user
        #we areUse using Django's secure create_user() method to create user
        user = User.objects.create_user(    
            username=validated_data["username"],
            email=validated_data.get("email", ""),
            password=validated_data["password"],
            role=validated_data["role"],
            phone=validated_data.get("phone", ""),
        )
        return user 