from rest_framework import serializers
from .models import FoodListing,FoodReservation
from django.db.models import Sum

class FoodListingSerializer(serializers.ModelSerializer):

    class Meta:
        model = FoodListing
        fields = '__all__'

        # avoiding client to select donor by selecting , default taking user.req from backend

        #telling  the serializer: donor is provided by the backend, not by the client
        #   Client
        #   ↓
        #  cannot provide/change donor

        #Because read-only applies to incoming client data.

        # It does NOT mean the backend cannot set the value.
        read_only_fields = ['donor']  

        def validate(self,attrs):
            available_from = attrs.get('available_from')
            available_until = attrs.get('available_until')

            if available_from and available_until:
                if available_from >=available_until:  #avaliable_from time be smaller
                    raise serializers.ValidationError({
                        'available_until': 'Available until must be later than available from'
                    })
            return attrs

        


class FoodReservationSerializer(serializers.ModelSerializer):

    class Meta:
        model = FoodReservation
        fields =  [
            "id",
            "food",
            "receiver",
            "quantity",
            "status",
            "reserved_at",
            "completed_at",
        ]

        read_only_fields = [
            'id',
            'receiver',
            'status',
            'reserved_at',
            'completed_at'
        ]


    #validates the quantity
    def validate_quantity(self,value):
        if value <= 0:
            raise serializers.ValidationError(
                'Quantity must be greater than 0.'
            )
        return value

    #validates checks remaining , reserved quantity
    def validate(self, attrs):
        food = attrs['food']
        
        return attrs

    