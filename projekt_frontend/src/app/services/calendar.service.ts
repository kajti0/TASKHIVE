import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  private baseUrl = 'https://localhost:7227/api/happenings';
  private happenings: any[] = [];

  constructor(private http: HttpClient, private authService: AuthService) {}

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

  private createAuthorizationHeader(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }
}
