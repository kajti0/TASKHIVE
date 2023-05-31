import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseHttpService {

  private readonly apiUrl = 'https://localhost:7078/api';
  
  constructor(private httpClient: HttpClient) {
  }

  protected get<T>(url: string): Observable<T> {
    return this.httpClient.get<T>(`${this.apiUrl}/${url}`);
  }

  protected getAll<T>(url: string): Observable<T[]> {
    return this.httpClient.get<T[]>(`${this.apiUrl}/${url}`);
  }

  protected post<T>(url: string, data: any): Observable<T> {
    return this.httpClient.post<T>(`${this.apiUrl}/${url}`, data);
  }

  protected put<T>(url: string, data: any): Observable<T> {
    return this.httpClient.put<T>(`${this.apiUrl}/${url}`, data);
  }

  protected delete<T>(url: string): Observable<T> {
    return this.httpClient.delete<T>(`${this.apiUrl}/${url}`);
  }
}
