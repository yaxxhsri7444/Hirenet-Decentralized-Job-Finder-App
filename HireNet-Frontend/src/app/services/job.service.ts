import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    return this.http.get(`${this.apiUrl}/all`);
  }

  getmyjob(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/job/${id}`);
  }

  createJob(job: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.apiUrl}/create`, job, { headers });
  }

  applyjob(id: string,): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put(`${this.apiUrl}/apply/${id}`, { headers });
  }

  deleteJob(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
