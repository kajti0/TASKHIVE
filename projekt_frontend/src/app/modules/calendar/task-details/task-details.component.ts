import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CalendarService } from 'src/app/services/calendar.service';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent {
  taskDetails: any;

  constructor
  (@Inject(MAT_DIALOG_DATA) public data: { taskDetails: any }, 
  private calendarService: CalendarService, 
  private dialogRef: MatDialogRef<TaskDetailsComponent>) {
    this.taskDetails = data.taskDetails;
  }
  handleCancelClick(): void {
    this.dialogRef.close();
  }
  handleEditClick(){}
  deleteEvent(): void {
    if (this.taskDetails.id) {
      this.calendarService.deleteHappening(this.taskDetails.id).subscribe(
        () => {
          this.dialogRef.close();
        },
        (error) => {
          console.error('Error deleting happening:', error);
        }
      );
    }
  }
}