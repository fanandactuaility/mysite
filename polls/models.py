from django.db import models
import datetime
from django.utils import timezone

# Create your models here.
class Poll(models.Model):
    question = models.CharField(max_length=200)
    qub_date = models.DateTimeField ('date published')

    def __unicode__(self):
        return self.question
    def was_published_recently(self):
        now = timezone.now()
        return  now - datetime.timedelta(days=1) <= self.qub_date <= now
        # return self.qub_date >= timezone.now() - datetime.timedelta(days=1)
    was_published_recently.admin_order_field = 'qub_date'
    was_published_recently.boolean = True
    was_published_recently.shor_description = 'Published recently?'

class Choice(models.Model):
    pull = models.ForeignKey(Poll)
    choice_text = models.CharField(max_length=200)
    votes = models.IntegerField(default=0)

    def __unicode__(self):
        return self.choice_text

class Getmessage(models.Model):
    name = models.CharField(max_length=100)
