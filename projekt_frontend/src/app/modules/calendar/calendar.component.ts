import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskComponent } from './add-task/add-task.component';
import { StatsDialogComponent } from './stats-dialog/stats-dialog.component';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {
  currentMonth: Date;
  daysOfWeek: string[];
  collapsed: boolean;
  weeks: { date: number | null, isCurrentMonth: boolean, eventTitle: string }[][] = [];
  selectedDay: { date: number | null, isCurrentMonth: boolean, eventTitle: string };

  constructor(private dialog: MatDialog) {
    this.currentMonth = new Date();
    this.daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    this.collapsed = false;
    this.selectedDay = { date: null, isCurrentMonth: false, eventTitle: '' };
    this.generateCalendar();
  }

  toggleMenu() {
    this.collapsed = !this.collapsed;
    console.log('Collapsed:', this.collapsed);
  }

  addEvent() {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: '300px',
      data: { date: null, title: '', description: '' }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.selectedDay.eventTitle = result.title;
        console.log('Event added:', result);
      }
    });
  }

  seeStats() {
    const dialogRef = this.dialog.open(StatsDialogComponent, {
      width: '300px',
      data: { productivity: 70, selfCare: 80 } // Ustaw sztywne wartości
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('Stats dialog closed');
    });
  }
  

  logout(){

  }

  myAccount(){

  }

  previousMonth() {
    this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() - 1, this.currentMonth.getDate());
    this.generateCalendar();
  }

  nextMonth() {
    this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + 1, this.currentMonth.getDate());
    this.generateCalendar();
  }

  selectDate(day: { date: number | null, isCurrentMonth: boolean, eventTitle: string }) {
    this.selectedDay = day;
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
    let week: { date: number | null, isCurrentMonth: boolean, eventTitle: string}[] = [];
    for (let i = 0; i < firstDayOfWeek; i++) {
      week.push({ date: null, isCurrentMonth: false, eventTitle: ''});
    }
    for (let i = 1; i <= daysInMonth; i++) {
      const isCurrentMonth = month === firstDayOfMonth.getMonth();
      const eventTitle = '';
      week.push({ date: i, isCurrentMonth, eventTitle});
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
