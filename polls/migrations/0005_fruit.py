# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('polls', '0004_personnew'),
    ]

    operations = [
        migrations.CreateModel(
            name='Fruit',
            fields=[
                ('name', models.CharField(max_length=100, serialize=False, primary_key=True)),
            ],
        ),
    ]
