import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { BehaviorSubject, Subject, map } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  private baseUrl = 'https://localhost:7227/api/happenings';
  private happenings: any[] = [];

  private selectedEventSubject = new BehaviorSubject<any>(null);
  selectedEvent$ = this.selectedEventSubject.asObservable();

  private calendarUpdateSubject = new Subject<void>();
  calendarUpdate$ = this.calendarUpdateSubject.asObservable();

  constructor(private http: HttpClient, private authService: AuthService) {}

  getUserId(): Observable<number> {
    const headers = this.createAuthorizationHeader();
  
    return this.http.get<any>('https://localhost:7227/api/Auth/myid', { headers })
      .pipe(
        map(response => response.id)
      );
  }
  
  

  getAllHappenings(): Observable<any> {
    const headers = this.createAuthorizationHeader();
    return this.http.get(`${this.baseUrl}/GetAllHappenings`, { headers });
  }

  getHappenings(): any[] {
    return this.happenings;
  }

  setHappenings(happenings: any[]): void {
    this.happenings = happenings;
  }

  addHappening(newHappening: any): Observable<any> {
    const headers = this.createAuthorizationHeader();
    return this.http.post(`${this.baseUrl}/AddHappening`, newHappening, { headers });
  }

  deleteHappening(id: number): Observable<any> {
    const headers = this.createAuthorizationHeader();
    return this.http.delete(`${this.baseUrl}/RemoveHappening/${id}`, { headers }).pipe(
      tap(() => {
        this.calendarUpdateSubject.next();
      })
    );
  }

  updateHappening(updatedHappening: any): Observable<any> {
    const headers = this.createAuthorizationHeader();
    return this.http.put(`${this.baseUrl}/UpdateHappening`, updatedHappening, { headers }).pipe(
      tap(() => {
        this.calendarUpdateSubject.next();
      })
    );
  }

  private createAuthorizationHeader(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  setSelectedEvent(event: any) {
    this.selectedEventSubject.next(event);
  }

  getSelectedEvent() {
    return this.selectedEventSubject.value;
  }

  getEventByDateAndTitle(fullDate: Date, title: string) {
    const happenings = this.getHappenings();
    return happenings.find((event) => {
      const eventDate = new Date(event.date);
      return eventDate.toDateString() === fullDate.toDateString() && event.title === title;
    });
  }
}
