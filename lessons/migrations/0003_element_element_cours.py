# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('lessons', '0002_element'),
    ]

    operations = [
        migrations.AddField(
            model_name='element',
            name='element_cours',
            field=models.ForeignKey(to='lessons.Lesson', default=1),
            preserve_default=False,
        ),
    ]
