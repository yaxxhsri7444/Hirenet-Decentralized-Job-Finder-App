import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private socket: Socket;
  private readonly SOCKET_URL = 'http://localhost:5000';

  constructor(private http: HttpClient) {
    this.socket = io(this.SOCKET_URL, {
      withCredentials: true, // for cookie/token auth if used
    });
  }

  // 👥 Get contacts
  getContacts(): Observable<any> {
    return this.http.get(`${this.SOCKET_URL}/chat/contacts`);
  }

  // 📜 Get messages between logged-in user and a contact
  getMessages(userId: string): Observable<any> {
    return this.http.get(`${this.SOCKET_URL}/chat/messages/${userId}`);
  }

  // 📨 Send a message (emit socket event)
  sendMessage(message: any) {
    this.socket.emit('sendMessage', message);
  }

  // 📥 Receive incoming messages
  receiveMessage(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('newMessage', (data) => {
        observer.next(data);
      });
    });
  }

  // 🔌 Optional: disconnect when not needed
  disconnectSocket() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}
