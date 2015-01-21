from django.db import models


class Lesson(models.Model):
    lesson_title = models.CharField(max_length=200)
    lesson_text = models.TextField()
    pub_date = models.DateTimeField('date published')

    def __str__(self):
        return self.lesson_title


class Element(models.Model):
    element_image = models.ImageField()
    element_name = models.CharField(max_length=100)
    element_description = models.TextField()
    element_date = models.DateField()
    pub_date = models.DateTimeField(auto_now_add=True, auto_now=False, verbose_name="Date de création")
    modify_date = models.DateTimeField(auto_now_add=False, auto_now=True, verbose_name="Date de modification")
    element_cours = models.ForeignKey('Lesson')

    def __str__(self):
        return self.element_name