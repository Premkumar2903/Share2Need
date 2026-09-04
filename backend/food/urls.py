from django.urls import path,include
from django.shortcuts import render,get_object_or_404
from .serializer import FoodListingSerializer
from . import views

urlpatterns = [
    # path('', views.foodlisting),
    # path('<int:id>/',views.foodlisting_detail)

    path('',views.FoodListingCreate.as_view()),
    path('<int:pk>/' , views.FoodListingDetail.as_view()),
    path('<int:pk>/cancel/', views.cancelFoodListingView.as_view()),

    path('reservation/', views.FoodReservationCreate.as_view()),
    path('reservation/my/', views.MyReservationListView.as_view()),
    path('reservation/<int:pk>/cancel/',views.CancelReservationView.as_view()),
    path('reservation/<int:pk>/complete/', views.CompleteReservationView.as_view()),
    #Donor sees reservations for their own food
    path('donor/reservation/',views.DonorReservationListView.as_view()),
]