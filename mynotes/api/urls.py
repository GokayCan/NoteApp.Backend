from django.urls import path
from . import views

urlpatterns = [
    path('', views.getRoute, name="routes"),
    path('notes/', views.getNotes, name="notes"),
    path('note/<int:id>', views.getNote, name="note"),
    path('notes/create', views.createNote, name="createNote"),
]