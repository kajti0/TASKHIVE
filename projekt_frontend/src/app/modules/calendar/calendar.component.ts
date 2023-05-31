import { Component } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {
  currentMonth: Date;
  daysOfWeek: string[];
  weeks: { date: number | null, isCurrentMonth: boolean }[][] = [];

  constructor() {
    this.currentMonth = new Date();
    this.daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    this.generateCalendar();
  }

  previousMonth() {
    this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() - 1, this.currentMonth.getDate());
    this.generateCalendar();
  }

  nextMonth() {
    this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + 1, this.currentMonth.getDate());
    this.generateCalendar();
  }

  selectDate(day: { date: number | null, isCurrentMonth: boolean }) {
    if (day.date !== null) {
      console.log('Selected date:', day.date);
    }
  }
  
  generateCalendar() {
    const year = this.currentMonth.getFullYear();
    const month = this.currentMonth.getMonth();
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const firstDayOfWeek = firstDayOfMonth.getDay();
    const daysInMonth = lastDayOfMonth.getDate();

    this.weeks = [];
    let week: { date: number | null, isCurrentMonth: boolean }[] = [];
    for (let i = 0; i < firstDayOfWeek; i++) {
      week.push({ date: null, isCurrentMonth: false });
    }
    for (let i = 1; i <= daysInMonth; i++) {
      const isCurrentMonth = month === firstDayOfMonth.getMonth();
      week.push({ date: i, isCurrentMonth });
      if (week.length === 7) {
        this.weeks.push(week);
        week = [];
      }
    }
    if (week.length > 0) {
      this.weeks.push(week);
    }
  }
}
