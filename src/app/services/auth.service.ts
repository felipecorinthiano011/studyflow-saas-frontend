import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${environment.apiUrl}/auth/login`, { email, password })
      .pipe(tap(res => localStorage.setItem('token', res.token)));
  }

  register(data: RegisterRequest): Observable<any> {
    return this.http.post(`${environment.apiUrl}/users`, data);
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
