# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Element',
            fields=[
                ('id', models.AutoField(auto_created=True, verbose_name='ID', primary_key=True, serialize=False)),
                ('element_image', models.ImageField(upload_to='')),
                ('element_name', models.CharField(max_length=100)),
                ('element_description', models.TextField()),
                ('element_date', models.DateField()),
                ('pub_date', models.DateTimeField(verbose_name='Date de création', auto_now_add=True)),
                ('modify_date', models.DateTimeField(verbose_name='Date de modification', auto_now=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
