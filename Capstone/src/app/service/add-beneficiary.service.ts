// src/app/service/add-beneficiary.service.ts
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddBeneficiary } from '../model/add-beneficiary';


@Injectable({
    providedIn: 'root'
})
export class AddBeneficiaryService {
    private apiUrl = 'http://localhost:8080/app/beneficiary'; // Adjust to your backend URL

    constructor(private http: HttpClient) {}

    // Method to get the Bearer token from local storage
    private getToken(): string | null {
        return localStorage.getItem('token'); // Adjust 'token' based on your local storage key
    }

    // Add Beneficiary
    addBeneficiary(beneficiary: AddBeneficiary): Observable<AddBeneficiary> {
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${this.getToken()}`
        });

        return this.http.post<AddBeneficiary>(this.apiUrl, beneficiary, { headers });
    }
     // Method to get all beneficiaries
     getAllBeneficiaries(page: number = 0, size: number = 10): Observable<any> {
      const headers = new HttpHeaders({
          'Authorization': `Bearer ${this.getToken()}`
      });
      return this.http.get<any>(`${this.apiUrl}?page=${page}&size=${size}`, { headers });
  }
  // Method to update a beneficiary
  updateBeneficiary(id: number, beneficiary: AddBeneficiary): Observable<AddBeneficiary> {
    const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.getToken()}`
    });

    return this.http.put<AddBeneficiary>(`${this.apiUrl}/${id}`, beneficiary, { headers });
}
}
