from django.urls import path
from . import views

urlpatterns = [
    path("questions/", views.QuestionList.as_view(), name="question-list")
    
]