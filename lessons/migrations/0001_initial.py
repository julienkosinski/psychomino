# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Branch',
            fields=[
                ('id', models.AutoField(serialize=False, primary_key=True, verbose_name='ID', auto_created=True)),
                ('branch_title', models.CharField(max_length=200)),
                ('pub_date', models.DateTimeField(auto_now_add=True, verbose_name='Date de creation')),
                ('modify_date', models.DateTimeField(auto_now=True, verbose_name='Date de modification')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Element',
            fields=[
                ('id', models.AutoField(serialize=False, primary_key=True, verbose_name='ID', auto_created=True)),
                ('element_type', models.CharField(choices=[('IMG', 'Image'), ('TEXT', 'Text')], max_length=4)),
                ('element_content', models.TextField()),
                ('pub_date', models.DateTimeField(auto_now_add=True, verbose_name='Date de creation')),
                ('modify_date', models.DateTimeField(auto_now=True, verbose_name='Date de modification')),
                ('element_branch', models.ForeignKey(to='lessons.Branch', related_name='elements')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Lesson',
            fields=[
                ('id', models.AutoField(serialize=False, primary_key=True, verbose_name='ID', auto_created=True)),
                ('lesson_title', models.CharField(max_length=200)),
                ('pub_date', models.DateTimeField(auto_now_add=True, verbose_name='Date de creation')),
                ('modify_date', models.DateTimeField(auto_now=True, verbose_name='Date de modification')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.AddField(
            model_name='branch',
            name='branch_lesson',
            field=models.ForeignKey(to='lessons.Lesson', related_name='branches'),
            preserve_default=True,
        ),
    ]
