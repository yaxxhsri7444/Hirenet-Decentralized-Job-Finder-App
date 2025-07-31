import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthUserService } from '../services/auth-user.service'; // Adjust the path as needed

@Component({
  selector: 'app-logic-page',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './logic-page.component.html',
  styleUrl: './logic-page.component.css',
})
export class LogicPageComponent {
  credentials = { email: '', password: '' };

  constructor(private authService: AuthUserService, private router: Router) {}

  loginUser() {
    this.authService.login(this.credentials).subscribe({
      next: (res) => {
        this.authService.setSession(res.token, res.user);
        alert('Login successful!');
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        alert(err.error.message || 'Login failed');
      },
    });
  }
}
