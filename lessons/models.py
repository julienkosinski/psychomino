from django.db import models
from imagekit.models import ProcessedImageField
from imagekit.processors import ResizeToFill, Adjust


class Lesson(models.Model):
    lesson_title = models.CharField(max_length=200)
    pub_date = models.DateTimeField(auto_now_add=True, auto_now=False, verbose_name="Date de creation")
    modify_date = models.DateTimeField(auto_now_add=False, auto_now=True, verbose_name="Date de modification")

    def __str__(self):
        return self.lesson_title

class Branch(models.Model):
    branch_title = models.CharField(max_length=200)
    pub_date = models.DateTimeField(auto_now_add=True, auto_now=False, verbose_name="Date de creation")
    modify_date = models.DateTimeField(auto_now_add=False, auto_now=True, verbose_name="Date de modification")
    branch_lesson = models.ForeignKey('Lesson', related_name='branches')

    def __str__(self):
        return self.branch_title


class Element(models.Model):
    ELEMENT_TYPE_CHOICE = (
        ('IMG', 'Image'),
        ('TEXT', 'Text'),
    )
    element_type = models.CharField(max_length=4, choices=ELEMENT_TYPE_CHOICE)
    if element_type == 'IMG':
        element_content = models.ImageField(upload_to='original')
    else:
        element_content = models.TextField()
    pub_date = models.DateTimeField(auto_now_add=True, auto_now=False, verbose_name="Date de creation")
    modify_date = models.DateTimeField(auto_now_add=False, auto_now=True, verbose_name="Date de modification")
    element_branch = models.ForeignKey('Branch', related_name='elements')

    def ElementImage():
        element_image = ProcessedImageField(upload_to='elementsImg',
                                            processors=[ResizeToFill(200, 200), Adjust(color=0.5)],
                                            format='PNG',
                                            options={'quality': 100})
        element = ElementImage.objects.all()[0]
        return element.element_image.url


    def __str__(self):
        return self.element_content