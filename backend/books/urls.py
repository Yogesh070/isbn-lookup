from django.urls import path
from . import views

urlpatterns = [
    path('lookup/<str:isbn>/', views.lookup_isbn, name='lookup_isbn'),
]
