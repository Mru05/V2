// src/app/components/pdf-download/pdf-download.component.ts
import { Component } from '@angular/core';
import { PdfDownloadService } from '../../service/pdf-download.service';


@Component({
  selector: 'app-pdf-download',
  templateUrl: './pdf-download.component.html',
})
export class PdfDownloadComponent {
  constructor(private pdfDownloadService: PdfDownloadService) {}

  // Method to download Employee PDF
  downloadEmployeePdf() {
    this.pdfDownloadService.downloadEmployeePdf().subscribe(
      (response) => {
        const blob = new Blob([response], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'EmployeeTableData.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      },
      (error) => {
        console.error('Error downloading the Employee PDF:', error);
      }
    );
  }

  // Method to download Beneficiary PDF
  downloadBeneficiaryPdf() {
    this.pdfDownloadService.downloadBeneficiaryPdf().subscribe(
      (response) => {
        const blob = new Blob([response], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'BeneficiaryTableData.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      },
      (error) => {
        console.error('Error downloading the Beneficiary PDF:', error);
      }
    );
  }
  downloadClientPdf() {
    this.pdfDownloadService.downloadClientPdf().subscribe(
      (response) => {
        // Create a Blob from the PDF stream
        const blob = new Blob([response], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);

        // Create a link element and trigger the download
        const a = document.createElement('a');
        a.href = url;
        a.download = 'ClientTableData.pdf'; // Download file name
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      },
      (error) => {
        console.error('Error downloading the Client PDF:', error);
      }
    );
  }
}
