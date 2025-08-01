import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthUserService } from '../services/auth-user.service';
import { ChatService } from '../services/chat.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-chatpage',
  imports: [CommonModule],
  templateUrl: './chatpage.component.html',
  styleUrl: './chatpage.component.css',
})
export class ChatpageComponent implements OnInit {
  contact: any[] = [];
  message: any[] = [];
  selectedUser: any = null;
  messageText: string = '';
  authService: any;

  constructor(
    private http: HttpClient,
    private chatservice: ChatService,
    private authservice: AuthUserService
  ) {
    this.authService = authservice;
  }

  ngOnInit(): void {
    this.fetchContacts();

    this.chatservice.receiveMessage().subscribe((msg: any) => {
      if (
        this.selectedUser &&
        (msg.senderId === this.selectedUser._id ||
          msg.receiverId === this.selectedUser._id)
      ) {
        this.message.push(msg);
      }
    });
  }

  fetchContacts() {
    const token = this.authservice.getToken();
    this.http
      .get('http://localhost:5000/chat/contacts', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .subscribe({
        next: (res: any) => {
          this.contact = res.contacts;
        },
        error: (err: any) => {
          console.error('❌ Failed to fetch contacts', err);
        },
      });
  }

  openchat(user: any) {
    this.selectedUser = user;

    this.chatservice.getMessages(user._id).subscribe({
      next: (res: any) => {
        this.message = res.messages;
      },
      error: (err) => {
        console.error('❌ Failed to fetch messages', err);
      },
    });
  }

  sendMessage() {
    const receiverId = this.selectedUser._id;

    const msg = {
      receiverId,
      content: this.messageText,
    };

    this.chatservice.sendMessage(msg).subscribe({
      next: (res: any) => {
        this.message.push(res.message);
      },
      error: (err) => {
        console.error('❌ Failed to send message', err);
      },
    });
    this.message.push({
      senderId: this.authservice.getUserId(),
      receiverId: receiverId,
      text: this.messageText,
    });
    this.messageText = '';
  }
}
