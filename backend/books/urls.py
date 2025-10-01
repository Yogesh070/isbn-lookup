from django.urls import path
from . import views

urlpatterns = [
    path('health/', views.health_check, name='health_check'),
    path('lookup/<str:isbn>/', views.lookup_isbn, name='lookup_isbn'),
]
