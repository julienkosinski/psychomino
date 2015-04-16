# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('lessons', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='branch',
            name='pub_date',
            field=models.DateTimeField(auto_now_add=True, verbose_name='Date de creation'),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='element',
            name='pub_date',
            field=models.DateTimeField(auto_now_add=True, verbose_name='Date de creation'),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='lesson',
            name='pub_date',
            field=models.DateTimeField(auto_now_add=True, verbose_name='Date de creation'),
            preserve_default=True,
        ),
    ]
