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

class Person(models.Model):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)

class Musician(models.Model):
    first_name = models.CharField(max_length=50)
    last_name =  models.CharField(max_length=50)
    instrument = models.CharField(max_length=100)

class Album(models.Model):
    artist = models.ForeignKey(Musician)
    name = models.CharField(max_length=100)
    release_date = models.DateField()
    num_stars = models.IntegerField()

class PersonNew(models.Model):
    SHIRT_SIZES = (
        ('S','Small'),
        ('M','Medium'),
        ('L','Large'),
    )
    name = models.CharField(max_length=60)
    shirt_size = models.CharField(max_length=1,choices=SHIRT_SIZES)

class Fruit(models.Model):
    name=models.CharField(max_length=100,primary_key=True)



class Manufacturer(models.Model):
    pass
class Car(models.Model):
    manufacturer = models.ForeignKey(Manufacturer)


class PersonNewM(models.Model):
    name = models.CharField(max_length=128)
    def __unicode__(self):
        return self.name

class Group(models.Model):
    name = models.CharField(max_length=128)
    members = models.ManyToManyField(PersonNewM,through='Membership')
    def __unicode__(self):
        return self.name

class Membership(models.Model):
    persionnewm = models.ForeignKey(PersonNewM)
    group = models.ForeignKey(Group)
    date_joined = models.DateField()
    invite_reason = models.CharField(max_length=60)

class ox(models.Model):
    horn_length = models.IntegerField()

    class Meta:
        ordering = ["horn_length"]
        verbose_name_plural = "oxen"

class Persion(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    birth_date = models.DateField()

    def bady_boomer_status(self):
        "Returns the Persion's baby-boomer status."
        import datetime
        if self.birth_date < datetime.time(1945,8,1):
            return "Pre-boomer"
        elif self.birth_date < datetime.time(1965,8,1):
            return "Bady boomer"
        else :
            return "Post-boomer"

    def _get_full_name(self):
        "Return the persion's full name ."
        return "%s %s" % (self.first_name,self.last_name)
    full_name = property(_get_full_name)



