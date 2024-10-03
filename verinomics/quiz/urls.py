from django.urls import path
from . import views

urlpatterns = [
    path("questions/all/", views.QuestionList.as_view(), name="question-list"), 
    path("questions/by-category/", views.CategorySearch.as_view(), name="question-by-category"), 

    
]