import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetDocument } from '../model/get-document';


@Injectable({
    providedIn: 'root'
})
export class GetDocumentService {
    private apiUrl = 'http://localhost:8080/app/documents'; // Adjust to your backend URL

    constructor(private http: HttpClient) {}

    getDocumentById(documentId: number): Observable<GetDocument> {
        return this.http.get<GetDocument>(`${this.apiUrl}/document/${documentId}`, {
            headers: new HttpHeaders({
                'Authorization': `Bearer ${localStorage.getItem('token')}` // Assuming the token is stored in local storage
            })
        });
    }

    getDocumentsByClientRegistrationNumber(registrationNumber: number): Observable<GetDocument[]> {
        return this.http.get<GetDocument[]>(`${this.apiUrl}/client/documents/${registrationNumber}`, {
            headers: new HttpHeaders({
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            })
        });
    }
}
