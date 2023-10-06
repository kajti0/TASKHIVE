import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CalendarService } from 'src/app/services/calendar.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent {
  event: { date: number | null, title: string, description: string } = { date: null, title: '', description: '' };

  constructor(
    public dialogRef: MatDialogRef<AddTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private calendarService: CalendarService
  ) { }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    // Tutaj możesz przekazać event do bazy danych, używając odpowiedniej funkcji z CalendarService
    this.calendarService.addHappening(this.event).subscribe(
      (response) => {
        console.log('Dodano wydarzenie:', response);
        // Możesz tutaj dodać obsługę sukcesu, np. odświeżenie listy wydarzeń w kalendarzu
        this.dialogRef.close(this.event);
      },
      (error) => {
        console.error('Błąd dodawania wydarzenia:', error);
        // Możesz tutaj dodać obsługę błędu, np. wyświetlenie komunikatu użytkownikowi
      }
    );
  }
}
