import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthUserService } from '../services/auth-user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  imports: [CommonModule,FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  user : any = {};
  editMode: boolean = false;

  constructor(private userservices: AuthUserService) {}

  ngOnInit(): void {
    this.fetchUserProfile();      
  }

  fetchUserProfile() {
    this.userservices.getProfile().subscribe({
      next: (res) => this.user = res,
      error: (err) => console.error('Error fetching user profile:', err)
    });
  }

  updateProfile() {
    this.userservices.updateProfile(this.user).subscribe({
      next: (res) => {
        this.user = res.user;
        this.editMode = false;

        console.log('Profile updated successfully:', res);
      },
      error: (err) => console.error('Error updating profile:', err)
    });
  }
}
