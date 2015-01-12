# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Lesson',
            fields=[
                ('id', models.AutoField(auto_created=True, serialize=False, verbose_name='ID', primary_key=True)),
                ('lesson_title', models.CharField(max_length=200)),
                ('lesson_text', models.TextField()),
                ('pub_date', models.DateTimeField(verbose_name='date published')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
