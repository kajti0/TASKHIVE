import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TaskDetailsComponent } from '../task-details/task-details.component';
import { CalendarService } from 'src/app/services/calendar.service';


@Component({
  selector: 'app-day-details',
  templateUrl: './day-details.component.html',
  styleUrls: ['./day-details.component.css']
})
export class DayDetailsComponent {
  day: { fullDate: Date | null, date: number | null, isCurrentMonth: boolean, eventTitles: string[] } = { fullDate: null, date: null, isCurrentMonth: false, eventTitles: [] };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { day: { fullDate: Date | null, date: number | null, isCurrentMonth: boolean, eventTitles: string[] } },
    private dialogRef: MatDialogRef<DayDetailsComponent>,
    private dialog: MatDialog,
    private calendarService: CalendarService
  ) {
    this.day = data.day;
  }

  openTaskDetails(taskTitle: string) {
    const event = this.calendarService.getEventByDateAndTitle(this.day.fullDate ?? new Date(), taskTitle);
    console.log('Selected task: ', event);
    if (event) {
      this.dialog.open(TaskDetailsComponent, {
        width: '300px',
        data: { taskDetails: event }
      });
      this.dialogRef.close();
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}

