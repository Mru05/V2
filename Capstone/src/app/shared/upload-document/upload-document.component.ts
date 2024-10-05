import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UploadDocumentService } from '../../service/upload-document.service';



@Component({
    selector: 'app-upload-document',
    templateUrl: './upload-document.component.html',
    styleUrls: ['./upload-document.component.css']
})
export class UploadDocumentComponent {
    uploadForm: FormGroup;

    constructor(private fb: FormBuilder, private uploadDocumentService: UploadDocumentService) {
        this.uploadForm = this.fb.group({
            type: ['', Validators.required],
            registrationNumber: ['', Validators.required],
            file: [null, Validators.required]
        });
    }

    onFileChange(event: any) {
        const file = event.target.files[0];
        this.uploadForm.patchValue({ file: file });

    }

    onSubmit() {
        const formData = this.uploadForm.value;
        this.uploadDocumentService.uploadDocument(formData.file, formData.type, formData.registrationNumber)
            .subscribe(response => {
              alert("Document uploaded successfully")
                console.log('Document uploaded successfully!', response);
            }, error => {
              alert("Failed to approve")
                console.error('Error uploading document', error);
            });
    }
}
