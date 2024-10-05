import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject: BehaviorSubject<string | null>;
  public userToken: Observable<string | null>;
  private readonly TOKEN_KEY = 'token'; // Token key for localStorage
  baseUrl = 'http://localhost:8080/api';
  role!: string;
  status!: string;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private jwtHelper: JwtHelperService
  ) {
    const storedToken = localStorage.getItem(this.TOKEN_KEY);
    this.userSubject = new BehaviorSubject<string | null>(storedToken);
    this.userToken = this.userSubject.asObservable();
  }

  // Login function
  login(data: { username: string; password: string }): Observable<any> {
    const url = `${this.baseUrl}/login`;
    return this.httpClient.post<any>(url, data).pipe(
      map((response) => {
        this.setToken(response.accessToken);
        this.status = response.status;
        localStorage.setItem('CLIENT_STATUS', this.status);
        const decodedToken = this.jwtHelper.decodeToken(response.accessToken);
        this.role = decodedToken.role[0].authority;
        console.log(this.role);
        return response;
      })
    );
  }

  // Register function
  register(clientData: any): Observable<any> {
    const url = `${this.baseUrl}/register`;
    console.log("Submitting form data", clientData); // Log the data being sent
    return this.httpClient.post<any>(url, clientData, {
        headers: {
            'Content-Type': 'application/json' // Ensure correct header if you're sending JSON
        }
    });
  }

  // Set token in localStorage and update BehaviorSubject
  private setToken(token: string | null): void {
    if (token) {
      localStorage.setItem(this.TOKEN_KEY, token);
      this.userSubject.next(token);
    } else {
      this.clearToken();
    }
  }

  // Clear token from localStorage and reset BehaviorSubject
  private clearToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.userSubject.next(null);
  }

  // Get roles from JWT token
  getUserRoles(): string[] {
    const token = this.userSubject.getValue();
    return this.decodeRoles(token);
  }

  // Check if user is authenticated based on token validity
  isAuthenticated(): boolean {
    const token = this.userSubject.getValue();
    return this.isValidToken(token);
  }

  // Decode roles from JWT token
  private decodeRoles(token: string | null): string[] {
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      try {
        const decodedToken = this.jwtHelper.decodeToken(token);
        return decodedToken.roles || [];
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
    return [];
  }

  // Validate if the token is still valid
  private isValidToken(token: string | null): boolean {
    if (token) {
      try {
        return !this.jwtHelper.isTokenExpired(token);
      } catch (error) {
        console.error('Error checking token expiration:', error);
        return false;
      }
    }
    return false; // No token means not authenticated
  }

  // Logout function, clear token and redirect to login page
  logout(): void {
    this.clearToken();
    this.router.navigate(['/login']);
  }
}
