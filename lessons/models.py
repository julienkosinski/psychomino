from django.db import models


class Lesson(models.Model):
    lesson_title = models.CharField(max_length=200)
    lesson_text = models.TextField()
    pub_date = models.DateTimeField('date published')

    def __str__(self):
        return self.lesson_title