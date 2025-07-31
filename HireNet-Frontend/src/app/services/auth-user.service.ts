import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthUserService {
  private apiUrl = 'http://localhost:5000/users'; // Update as per backend

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  register(user: {
    name: string;
    email: string;
    password: string;
    role: string;
  }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  setSession(token: string, user: any) {
    console.log('🧠 Saving token and user:', token, user);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  getUserId(): string {
    const rawUser = localStorage.getItem('user');

    const user = JSON.parse(rawUser || '{}');

    return user?.id; // 🔁 FIXED: use `id` instead of `_id`
  }

  getUserbyId(userId: string) {
    if (!userId) {
      throw new Error('User ID is required');
    }
    return this.http.get(`${this.apiUrl}/${userId}`);
  }

  private getHeaders() {
    const token = this.getToken();
    return {
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
      },
    };
  }

  getProfile(): Observable<any> {
    return this.http.get(`${this.apiUrl}/profile`, this.getHeaders());
  }

  // Update profile
  updateProfile(data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/profile`, data, this.getHeaders());
  }
}
