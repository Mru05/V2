import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UploadDocument } from '../model/upload-doc';


@Injectable({
    providedIn: 'root'
})
export class UploadDocumentService {
    private apiUrl = 'http://localhost:8080/app/documents'; // Adjust to your backend URL

    constructor(private http: HttpClient) {}

    uploadDocument(file: File, type: string, registrationNumber: number): Observable<UploadDocument> {
        const formData: FormData = new FormData();
        formData.append('file', file);
        formData.append('type', type);
        formData.append('registrationNumber', registrationNumber.toString());

        return this.http.post<UploadDocument>(`${this.apiUrl}/upload`, formData, {
            headers: new HttpHeaders({
                'Authorization': `Bearer ${localStorage.getItem('token')}` // Assuming you're storing your token in local storage
            })
        });
    }

    // Other methods for fetching documents can be added here
}
