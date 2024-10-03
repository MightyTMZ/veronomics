from rest_framework import serializers 
from .models import *


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"


class OptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Option
        fields = "__all__"



class QuestionSerializer(serializers.ModelSerializer):

    options = OptionSerializer(many=True, read_only=True)
    category = CategorySerializer()

    class Meta:
        model = Question
        fields = ["question_source", 'category', 'question_text', 'options','explanation']