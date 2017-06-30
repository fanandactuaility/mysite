# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('polls', '0006_auto_20170629_1229'),
    ]

    operations = [
        migrations.CreateModel(
            name='Group',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=128)),
            ],
        ),
        migrations.CreateModel(
            name='Membership',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('date_joined', models.DateField()),
                ('invite_reason', models.CharField(max_length=60)),
                ('group', models.ForeignKey(to='polls.Group')),
            ],
        ),
        migrations.CreateModel(
            name='PersonNewM',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=128)),
            ],
        ),
        migrations.AddField(
            model_name='membership',
            name='persionnewm',
            field=models.ForeignKey(to='polls.PersonNewM'),
        ),
        migrations.AddField(
            model_name='group',
            name='members',
            field=models.ManyToManyField(to='polls.PersonNewM', through='polls.Membership'),
        ),
    ]
