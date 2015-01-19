from django.db import models


class Element(models.Model):
    element_image = models.ImageField()
    element_name = models.CharField(max_length=100)
    element_description = models.TextField()
    element_date = models.DateField()
    pub_date = models.DateTimeField(auto_now_add=True, auto_now=False, verbose_name="Date de création")
    modify_date = models.DateTimeField(auto_now_add=False, auto_now=True, verbose_name="Date de modification")

    def __str__(self):
        return self.element_name
