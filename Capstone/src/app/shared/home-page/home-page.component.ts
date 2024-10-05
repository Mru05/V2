import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'] // Fix the property name to 'styleUrls'
})
export class HomePageComponent {

  constructor(private router: Router) {}

  navigateTo(page: string): void {
    this.router.navigate([`/${page}`]);
  }

  logout(): void {
    // Logic for clearing user session or token
    // For example:
    localStorage.removeItem('userToken'); // Adjust based on how you store user data
    this.router.navigate(['/login']); // Redirect to the login page
  }
}
