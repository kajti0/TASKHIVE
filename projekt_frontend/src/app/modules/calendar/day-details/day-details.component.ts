import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-day-details',
  templateUrl: './day-details.component.html',
  styleUrls: ['./day-details.component.css']
})
export class DayDetailsComponent {
  day: { fullDate: Date | null, date: number | null, isCurrentMonth: boolean, eventTitle: string } = { fullDate: null, date: null, isCurrentMonth: false, eventTitle: '' };

  constructor(@Inject(MAT_DIALOG_DATA) public data: { day: { fullDate: Date | null, date: number | null, isCurrentMonth: boolean, eventTitle: string } }) {
    this.day = data.day;
  }
}
