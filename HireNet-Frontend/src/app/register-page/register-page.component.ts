import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthUserService } from '../services/auth-user.service';

@Component({
  selector: 'app-register-page',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css',
})
export class RegisterPageComponent {
  user = {
    name: '',
    email: '',
    password: '',
    role: 'jobseeker',
  };

  constructor(private authService: AuthUserService, private router: Router) {}
  registerUser() {
    this.authService.register(this.user).subscribe({
      next: () => {
        console.log('Registration successful!');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.log(err.error.message || 'Registration failed');
      },
    });
  }
}
