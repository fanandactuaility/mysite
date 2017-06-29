from django.contrib import admin
from polls.models import Poll,Choice

# Register your models here.
# admin.site.register(Poll)
class ChoiceInline(admin.TabularInline):
    model = Choice
    extra = 3
class PollAdmin(admin.ModelAdmin):
    list_display = ('question','qub_date','was_published_recently')
    fieldsets = [
        (None , {'fields' : ['question']}),
        ('Date infomation' , {'fields' : ['qub_date'],'classes':['collapse']}),
    ]
    list_filter = ['qub_date']
    search_fields = ['question']
    date_hierarchy = 'qub_date'
    inlines = [ChoiceInline]
    # fields = ['qub_date' , 'question']
admin.site.register(Poll,PollAdmin)
# admin.site.register(Choice)
