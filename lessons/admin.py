from lessons.models import Lesson

from lessons.models import Element

from django.contrib import admin
admin.site.register(Lesson)

from django.contrib import admin
admin.site.register(Element)

import djadmin2
djadmin2.default.register(Lesson)

import djadmin2
djadmin2.default.register(Element)


# Register your models here.
