import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PdfDownloadService {

  private baseUrl = 'http://localhost:8080/app/pdf';

  constructor(private http: HttpClient) {}

  downloadEmployeePdf(): Observable<Blob> {
    // Get the token from local storage
    const token = localStorage.getItem('token'); // Adjust the key as necessary

    // Set up headers
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    // Make the request to download the PDF
    return this.http.get(`${this.baseUrl}/employees`, {
      headers: headers,
      responseType: 'blob' // Important for handling binary data
    });
  }
}
