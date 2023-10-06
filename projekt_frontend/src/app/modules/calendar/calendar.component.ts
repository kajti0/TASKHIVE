import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskComponent } from './add-task/add-task.component';
import { StatsDialogComponent } from './stats-dialog/stats-dialog.component';
import { Router } from '@angular/router';
import { DayDetailsComponent } from './day-details/day-details.component';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {
  currentMonth: Date;
  daysOfWeek: string[];
  collapsed: boolean;
  weeks: {fullDate: Date | null, date: number | null, isCurrentMonth: boolean, eventTitles: string[] }[][] = [];
  selectedDay: { fullDate: Date | null, date: number | null, isCurrentMonth: boolean, eventTitles: string[] }

  constructor(private dialog: MatDialog, private router: Router) {
    this.currentMonth = new Date();
    this.daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    this.collapsed = false;
    this.selectedDay = { fullDate: null, date: null, isCurrentMonth: false, eventTitles: [] };
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
      if (result && result.date) {
        const date = new Date(result.date);
        const selectedDate = date.getDate();
  
        const targetWeek = this.weeks.find(week => week.some(day => day.date === selectedDate));
  
        if (targetWeek) {
          const targetDayInWeek = targetWeek.find(day => day.date === selectedDate);
  
          if (targetDayInWeek) {
            const updatedEventTitles = [...targetDayInWeek.eventTitles, result.title];
            targetDayInWeek.eventTitles = updatedEventTitles;
            console.log('Event added:', result);
          } else {
            console.error(`Day ${selectedDate} not found in the current month.`);
          }
        } else {
          console.error(`Week not found for day ${selectedDate}.`);
        }
      }
    });
  }
  
  seeStats() {
    const dialogRef = this.dialog.open(StatsDialogComponent, {
      width: '300px',
      data: { productivity: 70, selfCare: 80 } // sztywne wartosci do zmiany
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('Stats dialog closed');
    });
  }
  
  openDayDetailsDialog(day: { fullDate: Date | null, date: number | null, isCurrentMonth: boolean, eventTitles: string[] }) {
    this.selectedDay = day;
    console.log('selected day: ', this.selectedDay);
    console.log('day in function: ', day);
    const dialogRef = this.dialog.open(DayDetailsComponent, {
      width: '300px',
      data: { day },
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('Day details dialog closed');
    });
  }
  
  
  logout(){
    this.router.navigate(['/login']);
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
  
  generateCalendar() {
    const year = this.currentMonth.getFullYear();
    const month = this.currentMonth.getMonth();
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const firstDayOfWeek = firstDayOfMonth.getDay();
    const daysInMonth = lastDayOfMonth.getDate();
  
    this.weeks = [];
    let week: any[] = [];
    for (let i = 0; i < firstDayOfWeek; i++) {
      week.push({ fullDate: null, date: null, isCurrentMonth: false, eventTitles: [] });
    }
    for (let i = 1; i <= daysInMonth; i++) {
      const fullDate = new Date(year, month, i);
      const isCurrentMonth = month === firstDayOfMonth.getMonth();
      const eventTitles: string[] = [];
      week.push({ fullDate, date: i, isCurrentMonth, eventTitles });
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
