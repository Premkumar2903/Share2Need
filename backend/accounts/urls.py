from django.urls import path
from . import views


urlpatterns = [
    path('',views.RegisterView.as_view()),
    path('me/',views.current_user),
]