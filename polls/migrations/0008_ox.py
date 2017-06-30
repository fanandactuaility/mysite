# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('polls', '0007_auto_20170629_1254'),
    ]

    operations = [
        migrations.CreateModel(
            name='ox',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('horn_length', models.IntegerField()),
            ],
            options={
                'ordering': ['horn_length'],
                'verbose_name_plural': 'oxen',
            },
        ),
    ]
