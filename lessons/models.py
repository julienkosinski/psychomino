from django.db import models


class Lesson(models.Model):
    lesson_title = models.CharField(max_length=200)
    pub_date = models.DateTimeField('date published')
    modify_date = models.DateTimeField(auto_now_add=False, auto_now=True, verbose_name="Date de modification")

    def __str__(self):
        return self.lesson_title

class Branch(models.Model):
    branch_title = models.CharField(max_length=200)
    pub_date = models.DateTimeField('date published')
    modify_date = models.DateTimeField(auto_now_add=False, auto_now=True, verbose_name="Date de modification")
    branch_lesson = models.ForeignKey('Lesson')

    def __str__(self):
        return self.branch_title


class Element(models.Model):
    element_content = models.TextField()
    ELEMENT_TYPE_CHOICE = (
        ('IMG', 'Image'),
        ('TEXT', 'Text'),
    )
    element_type = models.CharField(max_length=4, choices=ELEMENT_TYPE_CHOICE)
    pub_date = models.DateTimeField(auto_now_add=True, auto_now=False, verbose_name="Date de création")
    modify_date = models.DateTimeField(auto_now_add=False, auto_now=True, verbose_name="Date de modification")
    element_branch = models.ForeignKey('Branch')

    def __str__(self):
        return self.element_content