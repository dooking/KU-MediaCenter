from datetime import datetime, timedelta
from calendar import HTMLCalendar
from .models import Event
from app.models import EquipmentBorrow, StudioBorrow


class Calendar(HTMLCalendar):
    def __init__(self, year=None, month=None):
        self.year = year
        self.month = month
        super(Calendar, self).__init__()

    # '일'을 td 태그로 변환하고 이벤트를 '일'순으로 필터
    def formatday(self, day, events):
        events_per_day = events.filter(start_time__day=day)
        d = ''
        for event in events_per_day:
            d += f'<li> {event.get_html_url} </li>'

        if day != 0:
            return f"<td><span class='date'>{day}</span><ul class='event_line'> {d} </ul></td>"
        return '<td></td>'

    # '주'를 tr 태그로 변환
    def formatweek(self, theweek, events):
        week = ''
        for d, weekday in theweek:
            week += self.formatday(d, events)
        return f'<tr> {week} </tr>'

    # '월'을 테이블 태그로 변환
    # 각 '월'과 '연'으로 이벤트 필터
    def formatmonth(self, withyear=True):
        events = Event.objects.filter(
            start_time__year=self.year, start_time__month=self.month)

        cal = f'<table class="calendar">\n'
        cal += f'{self.formatmonthname(self.year, self.month, withyear=withyear)}\n'
        cal += f'{self.formatweekheader()}\n'
        for week in self.monthdays2calendar(self.year, self.month):
            cal += f'{self.formatweek(week, events)}\n'
        return cal
