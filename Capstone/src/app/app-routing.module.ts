import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBankComponent } from './shared/add-bank/add-bank.component';
import { AddBeneficiaryComponent } from './shared/add-beneficiary/add-beneficiary.component';
import { AddEmployeeComponent } from './shared/add-employee/add-employee.component';
import { AdminDashboardComponent } from './shared/admin-dashboard/admin-dashboard.component';
import { ApproveClientRequestPaymentComponent } from './shared/approve-client-request-payment/approve-client-request-payment.component';
import { ApproveKycStatusComponent } from './shared/approve-kyc-status/approve-kyc-status.component';
import { BeneficiaryReportComponent } from './shared/beneficiary-report/beneficiary-report.component';
import { CreateProfileComponent } from './shared/create-profile/create-profile.component';
import { EmployeeReportComponent } from './shared/employee-report/employee-report.component';
import { GenerateReportsComponent } from './shared/generate-reports/generate-reports.component';
import { GetDocumentComponent } from './shared/get-document/get-document.component';
import { HomePageComponent } from './shared/home-page/home-page.component';
import { LoginPageComponent } from './shared/login-page/login-page.component';
import { PaymentToBeneficiaryComponent } from './shared/payment-to-beneficiary/payment-to-beneficiary.component';
import { PaymentsComponent } from './shared/payments/payments.component';
import { PdfDownloadComponent } from './shared/pdf-download/pdf-download.component';
import { RegisterPageComponent } from './shared/register-page/register-page.component';
import { UploadDocumentComponent } from './shared/upload-document/upload-document.component';

const routes: Routes = [
  {path:'' , redirectTo:'/login' , pathMatch:'full'},
  {path:'login',component:LoginPageComponent},
  {path:'register',component:RegisterPageComponent},
  {path:'home',component:HomePageComponent},
  {path:'admin',component:AdminDashboardComponent},
  { path: 'add-bank', component: AddBankComponent },
  { path: 'add-beneficiary', component: AddBeneficiaryComponent },
  { path: 'add-employee', component: AddEmployeeComponent },
  { path: 'create-profile', component: CreateProfileComponent },
  { path: 'payment-to-beneficiary', component: PaymentToBeneficiaryComponent },
  { path: 'employee-report', component: EmployeeReportComponent },
  { path: 'beneficiary-report', component: BeneficiaryReportComponent },
  { path: 'approve-client-request-payment', component: ApproveClientRequestPaymentComponent },
  { path: 'approve-kyc-status', component: ApproveKycStatusComponent },
  { path: 'generate-reports', component: GenerateReportsComponent },
  { path: 'payments', component: PaymentsComponent },
  {path: 'upload-document', component:UploadDocumentComponent},
  {path: 'get-document', component:GetDocumentComponent},
{path: 'pdf-download', component:PdfDownloadComponent}
  


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
