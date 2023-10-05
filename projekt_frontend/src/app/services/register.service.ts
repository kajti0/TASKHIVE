import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private apiUrl = 'https://localhost:7227/api';

  constructor(private http: HttpClient) { }

  register(username: string, password: string): Observable<any> {
    const newUser = { username, password };
    return this.http.post(`${this.apiUrl}/Auth/Register`, newUser);
  }
}
