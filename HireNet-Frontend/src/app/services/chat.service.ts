


import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthUserService } from './auth-user.service';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({ providedIn: 'root' })
export class ChatService {
  receiveMessage(){
    return this.http.get<any[]>(`${this.apiUrl}/receive`, {
      headers: this.getHeaders(),
    });
  }


  private apiUrl = `http://localhost:5000/chat`;

  constructor(private http: HttpClient, private authService: AuthUserService) {}

  private getHeaders() {
    return new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`,
    });
  }

  getContacts() {
    return this.http.get<any[]>(`${this.apiUrl}/contacts`, {
      headers: this.getHeaders(),
    });
  }

  getMessages(conversationId: string) {
    return this.http.get<any[]>(`${this.apiUrl}/messages/${conversationId}`, {
      headers: this.getHeaders(),
    });
  }
  
  sendMessagebyjob(messageData: {
    jobId: string;
    senderId: string;
    receiverId: string;
    message: string;
  }): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.apiUrl}/send`, messageData, { headers });
  }

  sendMessage(data: { receiverId: string; content: string }) {
    return this.http.post(
      `${this.apiUrl}/send`,
      data,
      { headers: this.getHeaders() }
    );
  }

  markAsRead(conversationId: string) {
    return this.http.post(
      `${this.apiUrl}/read/${conversationId}`,
      {},
      { headers: this.getHeaders() }
    );
  }
}
