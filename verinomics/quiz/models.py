from django.db import models
from ckeditor.fields import RichTextField


class Question(models.Model):
    question_source = models.CharField(max_length=255)
    question_text = RichTextField()
    explanation = RichTextField()

    def __str__(self) -> str:
        return f"{self.id} - {self.question_source}"


class Option(models.Model):
    option_text = RichTextField()
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name="options")
    correct = models.BooleanField(default=False)