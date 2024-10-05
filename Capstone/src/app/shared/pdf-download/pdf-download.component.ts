import { Component } from '@angular/core';
import { PdfDownloadService } from '../../service/pdf-download.service';

@Component({
  selector: 'app-pdf-download',
  templateUrl: './pdf-download.component.html',
})
export class PdfDownloadComponent {
  constructor(private pdfDownloadService: PdfDownloadService) {}

  downloadPdf() {
    this.pdfDownloadService.downloadEmployeePdf().subscribe(
      (response) => {
        // Create a Blob from the PDF Stream
        const blob = new Blob([response], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);

        // Create a link element and trigger a download
        const a = document.createElement('a');
        a.href = url;
        a.download = 'EmployeeTableData.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      },
      (error) => {
        console.error('Error downloading the PDF:', error);
      }
    );
  }
}
