import { Component, OnInit } from '@angular/core';
import { Client } from '../../model/client'; // Ensure this import matches
import { ClientStatusUpdateDto } from '../../model/client-status-update-dto';
import { ClientKycStatusService } from '../../service/client-kyc-status.service';

@Component({
  selector: 'app-approve-kyc-status',
  templateUrl: './approve-kyc-status.component.html',
  styleUrls: ['./approve-kyc-status.component.css']
})
export class ApproveKycStatusComponent implements OnInit {
  clients: Client[] = [];
  errorMessage: string = '';

  constructor(private clientService: ClientKycStatusService) {}

  ngOnInit(): void {
    this.getPendingKycClients();
  }

  getPendingKycClients(): void {
    this.clientService.getPendingKycClients().subscribe(
      (data: Client[]) => {
        this.clients = data;
      },
      (error) => {
        this.errorMessage = 'Error fetching KYC status.';
        console.error('Fetch Error:', error);
      }
    );
  }

  approveKyc(registrationNumber: number): void {
    const updateDto: ClientStatusUpdateDto = { status: 'APPROVED' };

    this.clientService.updateClientKycStatus(registrationNumber, updateDto).subscribe(
      () => {
        this.getPendingKycClients();
      },
      (error) => {
        this.errorMessage = 'Error updating KYC status.';
        console.error('Approval Error:', error);
      }
    );
  }

  rejectKyc(registrationNumber: number): void {
    const updateDto: ClientStatusUpdateDto = { status: 'REJECTED' };

    this.clientService.updateClientKycStatus(registrationNumber, updateDto).subscribe(
      () => {
        this.getPendingKycClients();
      },
      (error) => {
        this.errorMessage = 'Error updating KYC status.';
        console.error('Rejection Error:', error);
      }
    );
  }
}
