import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';



@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent { 
  form!: FormGroup;
  loading = false;
  submitted = false;
  invalidLogin = false;
  loginError = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService, // private accountService: AccountService,
    private jwtHelper: JwtHelperService

  ) // private alertService: AlertService
  {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      recaptcha: ['', Validators.required]
    });
  }

  role!:string ;
  siteKey:string="6LdchlQqAAAAAOfiUYezJNFYdryuYQ3PbiYvVxry"

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.form.value);

    if (this.form.invalid) {
      return;
    }
    this.loading = true;
    this.authService
      .login({
        username: this.form.value.username,
        password: this.form.value.password
      })
      .subscribe({
          next: (response) => {   
            console.log(response);
            if (response && response.accessToken) {
              // localStorage.setItem('token', response.accessToken);
              const decodedToken = this.jwtHelper.decodeToken(response.accessToken)
              this.role = decodedToken.role[0].authority
              console.log(this.role)
              localStorage.setItem("token",response.accessToken)
              if(this.role == "ROLE_CLIENT"){
              this.router.navigate(['/home']);
              }
              if(this.role == "ROLE_SUPER_ADMIN"){
                this.router.navigate(['/admin']);
                }
            }
            this.loading = false;
          },
          error: (error) => {
            console.log('Some error occured' + error.error.status);
            console.log(error);
            if (error.error.status == 400) {
              this.invalidLogin = true;
            } else {
              console.log(error);
              
              this.loginError = true;
            }
            this.loading = false;
          }
        }

     
      );
    this.form.reset();
  }

}
