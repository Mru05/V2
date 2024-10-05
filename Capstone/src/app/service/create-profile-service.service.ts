import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClientProfileDto } from '../model/client-profile-dto';

@Injectable({
  providedIn: 'root'
})
export class CreateProfileServiceService {
  private apiUrl = 'http://localhost:8080/app';

  constructor(private http: HttpClient) { }

  updateClientProfile(registrationNumber: number, profile: ClientProfileDto): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}` // Make sure you have your token saved in local storage
    });

    return this.http.put<ClientProfileDto>(`${this.apiUrl}/${registrationNumber}`, profile, { headers });
  }
}
