import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../model/client';

@Injectable({
  providedIn: 'root'
})
export class ClientKycStatusService {
  private baseUrl = 'http://localhost:8080/app'; // Adjust this as needed

  constructor(private http: HttpClient) {}

  private getAuthHeaders() {
    const token = localStorage.getItem('token'); // Adjust this key based on your storage
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  // Method to get pending KYC clients
  getPendingKycClients(): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.baseUrl}/kyc-status`, { headers: this.getAuthHeaders() });
  }

  // Method to update KYC status
  updateClientKycStatus(registrationNumber: number, statusUpdateDto: any): Observable<Client> {
    return this.http.put<Client>(`${this.baseUrl}/${registrationNumber}/kyc-status`, statusUpdateDto, { headers: this.getAuthHeaders() });
  }
}
