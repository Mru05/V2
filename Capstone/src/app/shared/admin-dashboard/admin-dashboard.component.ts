import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {

  constructor(private router: Router) {}

  logout(): void {
    // Clear user token and navigate to login
    localStorage.removeItem('token');
    this.router.navigate(['/login-page']);
  }
}
