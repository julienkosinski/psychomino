# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('lessons', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Element',
            fields=[
                ('id', models.AutoField(serialize=False, primary_key=True, verbose_name='ID', auto_created=True)),
                ('element_image', models.ImageField(upload_to='')),
                ('element_name', models.CharField(max_length=100)),
                ('element_description', models.TextField()),
                ('element_date', models.DateField()),
                ('pub_date', models.DateTimeField(auto_now_add=True, verbose_name='Date de création')),
                ('modify_date', models.DateTimeField(auto_now=True, verbose_name='Date de modification')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
