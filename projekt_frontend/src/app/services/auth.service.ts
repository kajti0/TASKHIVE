import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenSubject = new BehaviorSubject<string | null>(null);
  private userIdSubject = new BehaviorSubject<number | null>(null);

  constructor() {
    const storedToken = localStorage.getItem('token');
    const storedUserId = localStorage.getItem('user_id');
    this.tokenSubject.next(storedToken);
    this.userIdSubject.next(storedUserId ? +storedUserId : null);
  }

  getToken(): string | null {
    return this.tokenSubject.value;
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
    this.tokenSubject.next(token);
  }

  clearToken(): void {
    localStorage.removeItem('token');
    this.tokenSubject.next(null);
  }

  getUserId(): number | null {
    return this.userIdSubject.value;
  }

  setUserId(userId: number): void {
    localStorage.setItem('user_id', userId.toString());
    this.userIdSubject.next(userId);
  }

  clearUserId(): void {
    localStorage.removeItem('user_id');
    this.userIdSubject.next(null);
  }
}
