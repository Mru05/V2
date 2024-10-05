import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GetDocument } from '../../model/get-document';
import { GetDocumentService } from '../../service/get-document.service';


@Component({
    selector: 'app-get-document',
    templateUrl: './get-document.component.html',
    styleUrls: ['./get-document.component.css']
})
export class GetDocumentComponent {
    documentForm: FormGroup;
    documents: GetDocument[] = []; // For storing retrieved documents
    errorMessage: string | null = null;

    constructor(private fb: FormBuilder, private getDocumentService: GetDocumentService) {
        this.documentForm = this.fb.group({
            registrationNumber: ['', Validators.required] // Assuming we are getting documents by registration number
        });
    }

    onSubmit() {
        const formData = this.documentForm.value;

        // Get documents by registration number
        this.getDocumentService.getDocumentsByClientRegistrationNumber(formData.registrationNumber)
            .subscribe(response => {
                this.documents = response; // Store the retrieved documents
                this.errorMessage = null; // Clear error message if the request is successful
            }, error => {
                console.error('Error retrieving documents', error);
                this.errorMessage = 'Documents not found for this registration number.';
                this.documents = []; // Clear documents if an error occurs
            });
    }
}
