from django.shortcuts import render,get_object_or_404
from django.http import  HttpResponse,HttpResponseRedirect
from django.core.urlresolvers import reverse
from django.views import generic
from django.utils import  timezone
from django.template import  Context,loader
from django.http import  Http404
from polls.models import Poll,Choice
class IndexView(generic.ListView):
    template_name = 'polls/index.html'
    context_object_name = 'latest_poll_list'
    def get_queryset(self):
        """
        Return the last five published questions (not includeing those to be  published in the future.
        :return:
        """
        return  Poll.objects.filter(qub_date__lte=timezone.now()).order_by('-qub_date')[:5]

class DetailViewNew(generic.DetailView):
    """
    Return the published qestion (not inculdeing those to be published in the future
    """
    def get_queryset(self):
        """
        Excludes any questions that aren't published yet.
        :return:
        """
        return  Poll.objects.filter(qub_date__lte=timezone.now())

        # return Poll.objects.order_by('-qub_date')[:5]
# def index(request):
#     latest_poll_list = Poll.objects.order_by('-qub_date')[:5]
#     context = {'latest_poll_list':latest_poll_list}
#     return render(request,'polls/index.html',context)
#     # # template = loader.get_template('polls/index.html')
#     # context = Context({
#     #     'latest_poll_list':latest_poll_list,
#     # })
#     # # return  HttpResponse(template.render(context))
#     # # a = 1
#     # # print latest_poll_list
#     # template = loader.get_template('polls/index.html')
#     # # context = Context({
#     # #     'latest_poll_list ': latest_poll_list,
#     # # } )
#     # # # output = ', '.join([p.question for  p in  latest_poll_list])
#     # # print context
#     # return HttpResponse(template.render(context))
#     # # return HttpResponse("Hello World,You are at the poll index.")
#     # # return render(request, 'polls/index.html',{'latest_poll_list':latest_poll_list} )
#     # # return render(request, 'polls/index.html', locals() )
#
# def detail(request,poll_id):
#     poll = get_object_or_404(Poll,pk=poll_id)
#     return  render(request,'polls/detail.html',{'poll':poll})
#     # try:
#     #     poll = Poll.objects.get(pk=poll_id)
#     # except Poll.DoesNotExist:
#     #     raise  Http404
#     # return  render(request,'polls/detail.html',{'poll':poll})
#     # return HttpResponse("You're looking at poll %s ." % poll_id)
# def results(request,poll_id):
#     poll = get_object_or_404(Poll,pk=poll_id)
#     return render(request,'polls/results.html',{"poll":poll})
#     return HttpResponse("You're looking at the results of poll %s ." % poll_id)

def vote(request,poll_id):
    p = get_object_or_404(Poll,pk=poll_id)
    try:
        selected_choice = p.choice_set.get(pk=request.POST['choice'])
    except (KeyError,Choice.DoesNotExist):
        #Redisplay the poll voting form.
        return render(request,'polls/detail.html',{
            "poll":p,
            "error_mesage":"you didn;t select a choice."
        })
    else:
        selected_choice.votes += 1
        selected_choice.save()
        #Always return an HttpResponseRirect after successfully dealing.
        #with POST data. This prevents data from posted twice if a
        #user hits the Back button.
        return HttpResponseRedirect(reverse('polls:results',args=(p.id,)))
    # return HttpResponse("You're voting on poll %s." % poll_id)