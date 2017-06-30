# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('polls', '0003_auto_20170629_0810'),
    ]

    operations = [
        migrations.CreateModel(
            name='PersonNew',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=60)),
                ('shirt_size', models.CharField(max_length=1, choices=[(b'S', b'Small'), (b'M', b'Medium'), (b'L', b'Large')])),
            ],
        ),
    ]
