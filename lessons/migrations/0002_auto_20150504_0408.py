# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('lessons', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='element',
            name='element_type',
            field=models.CharField(choices=[('IMG', 'Image'), ('TEXT', 'Text'), ('TXT', 'PetitTexte')], max_length=4),
            preserve_default=True,
        ),
    ]
