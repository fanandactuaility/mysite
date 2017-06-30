from django.db import models

# Create your models here.

class Blog(models.Model):
	name = models.CharField(max_length=100)
	tagline = models.TextField()

	def save(self, *args,**kwargs):
		if self.name == "Yoko Ono's blog!":
			return
		else:
			super(Blog,self).save(*args,**kwargs)