import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class jobService {
  private apiUrl = 'http://localhost:5000/jobs'; // Update as per backend

  constructor(private http: HttpClient, private router: Router) {}

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  private getHeaders() {
    const token = this.getToken();
    return {
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
      },
    };
  }

  getJobs(): Observable<any> {
    return this.http.get(`${this.apiUrl}/all`, this.getHeaders());
  }

  getmyjob(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/myjob`);
  }

  createJob(job: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, job);
  }

  applyjob(id: string, job: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/`, job);
  }

  deleteJob(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
