# Generated by Django 5.1 on 2024-10-04 03:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('quiz', '0002_remove_question_category_question_category'),
    ]

    operations = [
        migrations.AddField(
            model_name='question',
            name='difficulty',
            field=models.CharField(choices=[('E', 'Easy'), ('M', 'Medium'), ('H', 'Hard')], default='M', max_length=1),
        ),
    ]
