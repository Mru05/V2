// src/app/component/add-beneficiary/add-beneficiary.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AddBeneficiary } from '../../model/add-beneficiary';
import { AddBeneficiaryService } from '../../service/add-beneficiary.service';

@Component({
    selector: 'app-add-beneficiary',
    templateUrl: './add-beneficiary.component.html',
    styleUrls: ['./add-beneficiary.component.css']
})
export class AddBeneficiaryComponent implements OnInit {
    beneficiaryForm: FormGroup;
    beneficiaries: AddBeneficiary[] = []; // To hold the fetched beneficiaries
    currentPage: number = 0;
    pageSize: number = 10;
    isEditing: boolean = false; // To track if we are in edit mode
    currentBeneficiaryId: number | null = null; // To hold the ID of the beneficiary being edited

    constructor(private fb: FormBuilder, private beneficiaryService: AddBeneficiaryService) {
        this.beneficiaryForm = this.fb.group({
            beneficiaryName: ['', Validators.required],
            beneficiaryAccountNumber: [null, [Validators.required, Validators.min(0)]],
            beneficiaryIfsc: ['', Validators.required],
            balance: [null, [Validators.required, Validators.min(0)]],
            registrationNumber: [null, Validators.required]
        });
    }

    ngOnInit(): void {
        this.loadBeneficiaries();
    }

    // Method to load beneficiaries
    loadBeneficiaries(): void {
        this.beneficiaryService.getAllBeneficiaries(this.currentPage, this.pageSize).subscribe({
            next: (data) => {
                this.beneficiaries = data.content; // Assuming the response has a content property
            },
            error: (error) => {
                console.error('Error fetching beneficiaries:', error);
            }
        });
    }

    onSubmit(): void {
        if (this.beneficiaryForm.valid) {
            const beneficiary: AddBeneficiary = this.beneficiaryForm.value;
            if (this.isEditing && this.currentBeneficiaryId !== null) {
                // Update existing beneficiary
                this.beneficiaryService.updateBeneficiary(this.currentBeneficiaryId, beneficiary).subscribe({
                    next: (data) => {
                        console.log('Beneficiary updated successfully:', data);
                        this.resetForm();
                        this.loadBeneficiaries(); // Reload beneficiaries after updating
                    },
                    error: (error) => {
                        console.error('Error updating beneficiary:', error);
                    }
                });
            } else {
                // Add new beneficiary
                this.beneficiaryService.addBeneficiary(beneficiary).subscribe({
                    next: (data) => {
                        console.log('Beneficiary added successfully:', data);
                        this.resetForm();
                        this.loadBeneficiaries(); // Reload beneficiaries after adding
                    },
                    error: (error) => {
                        console.error('Error adding beneficiary:', error);
                    }
                });
            }
        }
    }

    // Method to set beneficiary for editing
    editBeneficiary(beneficiary: AddBeneficiary): void {
        this.isEditing = true;
        this.currentBeneficiaryId = beneficiary.beneficiaryId; // Set the ID for updating
        this.beneficiaryForm.patchValue(beneficiary); // Populate the form with the selected beneficiary's data
    }

    // Method to reset the form
    resetForm(): void {
        this.beneficiaryForm.reset();
        this.isEditing = false;
        this.currentBeneficiaryId = null;
    }
}
