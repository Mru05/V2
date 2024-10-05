import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../model/employee';

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {
    private apiUrl = 'http://localhost:8080/app/employees'; // Adjust to your backend URL

    constructor(private http: HttpClient) {}

    // Method to get the Bearer token from local storage
    private getToken(): string | null {
        return localStorage.getItem('token'); // Adjust 'token' based on your local storage key
    }

    addEmployee(employee: Employee): Observable<Employee> {
        // Create the headers with the Bearer token
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${this.getToken()}`
        });

        return this.http.post<Employee>(`${this.apiUrl}/add`, employee, { headers });
    }
    getAllEmployees(): Observable<Employee[]> {
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${this.getToken()}`
        });
    
        return this.http.get<Employee[]>(`${this.apiUrl}`, { headers });
      }

      updateEmployee(id: number, employee: Employee): Observable<Employee> {
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${this.getToken()}`
        });
        
        return this.http.put<Employee>(`${this.apiUrl}/${id}`, employee, { headers });
    }
    
}
