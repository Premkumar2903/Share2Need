from django.shortcuts import render,get_object_or_404

from .models import FoodListing,FoodReservation
from .serializer import FoodListingSerializer,FoodReservationSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status ,generics ,serializers
from rest_framework.permissions import IsAuthenticated
from .permissions import IsDonor ,IsOwnerOrReadOnly , IsReceiver
from django.db import transaction
from django.db.models import Sum
from django.utils import timezone
from rest_framework.exceptions import ValidationError

# Create your views here.



# @api_view(['GET','POST'])
# def foodlisting(req):

#     if req.method == 'GET':
#         food = FoodListing.objects.all()    
#         serializer = FoodListingSerializer(food, many = True)
#         return Response(serializer.data)

#     elif(req.method == 'POST'):

#         serializer = FoodListingSerializer(data = req.data)

#         if serializer.is_valid:
#             serializer.save()
#             return Response (serializer.data, status=status.HTTP_201_CREATED)

#         return Response(serializer.errors,status=status.HTTP_404_NOT_FOUND)

# @api_view(['GET','PUT','DELETE'])
# def foodlisting_detail(req,id):

#     food = FoodListing.objects.get(id=id)

#     if req.method == 'GET':
#         serializer = FoodListingSerializer(food)
#         return Response(serializer.data, status=status.HTTP_200_OK)

#     if req.method == 'PUT':
        
#         serializer = FoodListingSerializer(food,data = req.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response (serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

#     if req.method == 'DELETE':
#         food.delete()
#         return Response({'message' : 'deleted food list'} ,status=status.HTTP_404_NOT_FOUND)


class FoodListingCreate(generics.ListCreateAPIView):

    
    serializer_class = FoodListingSerializer
    # permission_classes = [IsAuthenticated]      #adding authentication

    def get_permissions(self):
         if self.request.method == 'POST':  #only donor can post
            return [IsDonor()]    #adding custom permission to check authentication and role == 'DONOR' to allow create food
         return [IsAuthenticated()]

    def get_queryset(self):

        if self.request.user.role == "DONOR":
            return FoodListing.objects.filter(
                donor=self.request.user
            )

        if self.request.user.role == "RECEIVER":
            return FoodListing.objects.filter(
                status=FoodListing.Status.AVAILABLE,
                available_until__gt =timezone.now()
            )

        return FoodListing.objects.none()


    def perform_create(self, serializer):
         #assigninh donor by backend by default req.user , then it takes logined user as donor
         serializer.save(donor=self.request.user) 



class FoodListingDetail(generics.RetrieveUpdateDestroyAPIView):
     queryset = FoodListing.objects.all()
     serializer_class = FoodListingSerializer
     permission_classes = [IsAuthenticated , IsOwnerOrReadOnly]   #adding authentication



class FoodReservationCreate(generics.CreateAPIView):
    queryset = FoodReservation.objects.all()
    serializer_class = FoodReservationSerializer
    permission_classes = [IsReceiver]        #cheching role is receiver


     #transaction.atomic() = Treat everything inside this function as one database transaction
    @transaction.atomic
    def perform_create(self, serializer):

        food_id = serializer.validated_data['food'].id
        #elect_for_update() Retrieve this food row and lock it until the current transaction finishes
        food = FoodListing.objects.select_for_update().get(  
            id = food_id
        )

        now = timezone.now()
        if timezone.now() < food.available_from:
            print("NOW:", now)
            print("AVAILABLE FROM:", food.available_from)
            print("NOW < AVAILABLE FROM:", now < food.available_from)
            raise ValidationError('This food is not available for pickup yet')

        if timezone.now() > food.available_until:
            food.status = FoodListing.Status.EXPIRED    #setting food expired if current time passed expiredtime
            food.save(update_fields=['status'])
            raise ValidationError('This food listing has expired')

        requested_quantity = serializer.validated_data['quantity']
        
        # Calculate already reserved quantity
        already_reserved = FoodReservation.objects.filter(
          food = food,
          status = FoodReservation.Status.RESERVED
          ).aggregate(                #adds their quantities.
            #Find reservations for this food that are currently RESERVED.
          total = Sum('quantity')
          )['total'] or 0


          #calculate remaining quantity
        remaining_quantity = food.quantity - already_reserved

         #checks availabilty quantity if greater raise error
        if requested_quantity > remaining_quantity:
          raise ValidationError({
               'quantity' : (
                    f'Only {remaining_quantity} {food.unit}'
                    f'are available'
               )
          })

        
        # #saves receiver as current request user 
        serializer.save(
            receiver = self.request.user,
            food= food
        )

        # remaining_after_reservation = (
        #     remaining_quantity - requested_quantity
        # )


        #updating status when 0 changes to reserved
        # if remaining_after_reservation == 0:
        #     food.status = FoodListing.Status.RESERVED  #changes in memory
        #     #update the status column in DB
        #     food.save(update_fields=['status'])

        food.update_status()



# creating receriver list view
class MyReservationListView(generics.ListAPIView):

    serializer_class = FoodReservationSerializer
    permission_classes = [IsReceiver]

    def get_queryset(self):
     return FoodReservation.objects.filter(
          receiver = self.request.user
     ).order_by('-reserved_at')          #order the reservation by time



#receiver can cancel their own reservation 
class CancelReservationView(generics.GenericAPIView):

    queryset = FoodReservation.objects.all()
    permission_classes = [IsReceiver]

    @transaction.atomic
    def post(self, request , pk):
        reservation = FoodReservation.objects.select_for_update().select_related(
            'food'
        ).filter(
            id=pk,
            receiver = request.user
        ).first()

        if not reservation:
            raise serializers.ValidationError(
                "Reservation not found."
            )

        if reservation.status != FoodReservation.Status.RESERVED:
            raise serializers.ValidationError(
                "Only active reservations can be cancelled."
            )

        food = FoodListing.objects.select_for_update().get(
            id=reservation.food.id
        )

        # Cancel reservation
        reservation.status = FoodReservation.Status.CANCELLED
        reservation.save(
            update_fields=["status"]
        )

        # Make food available again
        # if food.status == FoodListing.Status.RESERVED:
        #     food.status = FoodListing.Status.AVAILABLE
        #     food.save(
        #         update_fields=["status"]
        #     )
        food.update_status()

        return Response({
            "message": "Reservation cancelled successfully."
        })


class CompleteReservationView(generics.GenericAPIView):

    queryset = FoodReservation.objects.all()
    permission_classes = [IsReceiver]

    @transaction.atomic
    def post(self,request,pk):
        reservation = (
            FoodReservation.objects.select_for_update()
            .select_related('food')
            .filter(
                id = pk,
                receiver = request.user
            ).first()
        )

        if not reservation:
            raise ValidationError(
                "Reservation not found."
            )
        if reservation.status != FoodReservation.Status.RESERVED:
            raise ValidationError(
                "Only active reservations can be completed."
            )

        food = FoodListing.objects.select_for_update().get(
            id = reservation.food.id
        )

        reservation.status = FoodReservation.Status.COMPLETED
        reservation.completed_at = timezone.now()

        reservation.save(
            update_fields=[
                'status',
                'completed_at'
            ]
        )

        # food.update_status()

        return Response({
            "message" : "Reservation completed successfully"
        })






class DonorReservationListView(generics.ListAPIView):
    serializer_class = FoodReservationSerializer
    permission_classes = [IsDonor]

    def get_queryset(self):
        return FoodReservation.objects.filter(
            food__donor=self.request.user
        ).select_related(
            'food','receiver'
        ).order_by(
            '-reserved_at'
        )

    