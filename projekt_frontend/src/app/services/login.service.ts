import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'https://localhost:7227/api';

  constructor(private http: HttpClient, private authService: AuthService) {}

  login(username: string, password: string): Observable<any> {
    const loginData = { username, password };
    return this.http.post<any>(`${this.apiUrl}/Auth/Login`, loginData)
      .pipe(
        map(response => {
          const token = response?.token;
          const myid = this.authService.getUserId();
          console.log('ID Użytkownika: ', myid);
          if (token) {
            this.authService.setToken(token);
          }
          return response;
        })
      );
  }

  logout(): void {
    this.authService.clearToken();
  }
}
