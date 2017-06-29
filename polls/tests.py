from django.test import TestCase
import  datetime
from django.utils import  timezone
from polls.models import  Poll
from django.core.urlresolvers import  reverse
# Create your tests here.

def create_question(question_text,days):
    """
    Create a question with the given `question_text` published the given
    number of `days` offset to now (negative for question published
    in the past,positive for the questions that have yet to be published ).
    :param question_text:
    :param days:
    :return:
    """
    time = timezone.now() + datetime.timedelta(days=days)
    return Poll.objects.create(question=question_text,qub_date=time)


class QestionViewTests(TestCase):
    def test_index_view_with_no_questions(self):
        """
        If no question exist. an appropriate message should be displayed.
        :return:
        """
        response = self.client.get(reverse('polls:index'))
        self.assertEqual(response.status_code,200)
        self.assertContains(response,"No polls  are avaiable.")
        self.assertQuerysetEqual(response.context['latest_poll_list'],[])

    def test_index_view_with_a_past_question(self):
        """
        Qustions with the qub_date in the past should  be displayed on the index page.
        :return:
        """
        create_question(question_text="Past question.",days=-30)
        response = self.client.get(reverse('polls:index'))
        # print response.context['latest_poll_list']
        self.assertQuerysetEqual(
            response.context['latest_poll_list'],['<Poll: Past question.>']
        )
    def test_index_view_with_a_future_question(self):
        """
        Qustion with the qub_date in the future should be displayed on the index page.
        :return:
        """
        create_question(question_text="Future question.",days=30)
        response = self.client.get(reverse('polls:index'))
        # print response
        self.assertContains(response,"No polls  are avaiable.",status_code=200)
        self.assertQuerysetEqual(response.context['latest_poll_list'],[])


    def test_index_view_with_future_question_and_past_question(self):
        """
        Even if both past and future questions exist,only past questions should be displayed.
        :return:
        """
        create_question(question_text="Past question.",days=-30)
        create_question(question_text="Future question.",days=30)
        response = self.client.get(reverse('polls:index'))
        self.assertQuerysetEqual(
            response.context['latest_poll_list'],
            ['<Poll: Past question.>']
        )
    def test_index_view_with_two_past_questions(self):
        """
        The questions index page may displayed multiple quetions.
        :return:
        """
        create_question(question_text="Past question 1.",days=-30)
        create_question(question_text="Past question 2.",days=-5)
        response = self.client.get(reverse('polls:index'))
        self.assertQuerysetEqual(
            response.context['latest_poll_list'],
            ['<Poll: Past question 2.>','<Poll: Past question 1.>']
        )

class QuestionMethodTest(TestCase):
    def test_was_published_recently_with_future_question(self):
        """
        was_published_recently() should retuen False question whose
        qub_date is the future.
        :return:
        """
        time  = timezone.now() + datetime.timedelta(days=30)
        future_question = Poll(qub_date = time)
        self.assertEqual(future_question.was_published_recently(),False)
    def test_was_published_recently_with_old_question(self):
        """
        was_publised_recently() should retuen False question whose
        qub_date is older then 1 days
        :return:
        """
        time = timezone.now() - datetime.timedelta(days=30)
        old_question = Poll(qub_date = time)
        self.assertEqual(old_question.was_published_recently(),False)

    def test_was_published_recently_with_recent_question(self):
        """
        was_publisehed_recently() should retuen Ture question whose
        qub_date is within the last day.
        :return:
        """
        time = timezone.now() - datetime.timedelta(hours=1)
        recent_question = Poll(qub_date = time)
        self.assertEqual(recent_question.was_published_recently(),True)


class QuestionIndexDetailTests(TestCase):
    def test_detail_view_with_a_future_question(self):
        """
        The detail view of a question with a qub_date in the future should return a 404 not found.
        :return:
        """
        future_question = create_question(question_text="Future question",days=511)
        response = self.client.get(reverse('polls:detail',args=(future_question.id,)))
        self.assertEqual(response.status_code,404)

    def test_detail_view_with_a_past_question(self):
        """
        The detail view of a question with a qub_date in the past should display the question's text
        :return:
        """
        past_question = create_question(question_text="Past question.",days=-5)
        # response = self.client.get(reverse('polls:detail', args=(past_question.id,)))
        response = self.client.get(reverse('polls:detail', args=(past_question.id,)))
        self.assertContains(response,past_question.question,status_code=200)

