import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  @Output() toggleSidebar = new EventEmitter<void>();

  isloggedIn = false;
  constructor(private router: Router) {}

  navLinks = [
    { path: '/home', label: 'Home' },
    { path: '/jobs', label: 'Jobs' },
    { path: '/about', label: 'About' },
    { path: '/chats', label: 'Chats' },
  ];

  onToggleSidebar() {
    this.toggleSidebar.emit();
  }

  toggleTheme(event: any) {
    document.body.classList.toggle('dark-mode', event.target.checked);
  }

  login(): void {
    this.router.navigate(['/login']);
    this.isloggedIn = true;
  }

  register(): void {
    this.router.navigate(['/register']);
    this.isloggedIn = true;
  }

  logout(): void {
    this.router.navigate(['/']);
    this.isloggedIn = false;
  }
}
