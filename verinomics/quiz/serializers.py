from rest_framework import serializers 
from .models import *

class OptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Option
        fields = "__all__"



class QuestionSerializer(serializers.ModelSerializer):

    options = OptionSerializer(many=True, read_only=True)

    class Meta:
        model = Question
        fields = ["question_source", 'question_text', 'options','explanation']