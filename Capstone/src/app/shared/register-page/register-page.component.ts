import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {
  form!: FormGroup;
  loading = false;
  submitted = false;
  registrationError = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      email: ['', [Validators.required, Validators.email]],
      registrationNumber: ['', Validators.required],  // Updated field
    });
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.loading = true;

    const clientData = {
      username: this.form.value.username,
      password: this.form.value.password,
      email: this.form.value.email,
      registrationNumber: this.form.value.registrationNumber,
    };

    this.authService.register(clientData).subscribe({
      next: (response) => {
        console.log('Registration successful', response);
        alert('Registration successful! Please log in.'); // Show alert on success
        this.loading = false;
        this.router.navigate(['/login']); // Redirect to login
      },
      error: (error) => {
        console.error('Registration failed', error);
        this.loading = false;
        this.registrationError = true; // Show registration error
      },
    });
  }
}
