import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { CalendarService } from 'src/app/services/calendar.service';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent {
  editedEvent: any;
  userId: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { editedEvent: any },
    private calendarService: CalendarService,
    private dialogRef: MatDialogRef<EditEventComponent>,
    private authService: AuthService
  ) {
    this.editedEvent = { ...data.editedEvent };
    this.userId = null;
  }

  saveChanges(): void {
    this.calendarService.getUserId().subscribe(
      userId => {
        this.userId = userId;
      },
      error => {
        console.error('Error getting user ID:', error);
      }
    );

    const updatedEvent = {
      id: this.editedEvent.id,
      title: this.editedEvent.title,
      description: this.editedEvent.description,
      date: this.editedEvent.date,
      userId: this.userId
    };
    console.log('Updated event: ', updatedEvent);

    this.calendarService.updateHappening(updatedEvent).subscribe(
      () => {
        this.dialogRef.close();
      },
      (error) => {
        console.error('Error updating happening:', error);
      }
    );
  }
}
