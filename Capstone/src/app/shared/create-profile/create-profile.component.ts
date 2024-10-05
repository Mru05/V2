import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientProfileDto } from '../../model/client-profile-dto';

import { CreateProfileServiceService } from '../../service/create-profile-service.service';


@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.css']
})
export class CreateProfileComponent implements OnInit {
  createProfileForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private createProfileService: CreateProfileServiceService
  ) {
    this.createProfileForm = this.fb.group({
      clientRegistrationNumber: ['', [Validators.required]],
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      state: ['', [Validators.required]],
      city: ['', [Validators.required]],
      accountNumber: ['', [Validators.required]],
      balance: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.createProfileForm.valid) {
      const updatedProfile: ClientProfileDto = this.createProfileForm.value;
  
      // Get the registration number from the form
      const registrationNumber = this.createProfileForm.get('clientRegistrationNumber')?.value;
  
      // Debugging logs
      console.log('Registration Number:', registrationNumber);
      console.log('Updated Profile:', updatedProfile);
  
      // Make the API call to update the profile
      this.createProfileService.updateClientProfile(registrationNumber, updatedProfile)
        .subscribe({
          next: (response) => {
            console.log('Client profile updated successfully:', response);
            
            // Show an alert after successful update
            alert('Client profile updated successfully!');
            
            // Optionally, reset the form after successful update
            this.createProfileForm.reset();
          },
          error: (err) => {
            console.error('Error updating client profile:', err);
            alert('Error updating client profile. Please try again.');
          }
        });
    }
  }
}  