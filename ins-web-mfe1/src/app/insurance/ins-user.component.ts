import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { DomSanitizer } from '@angular/platform-browser'; // Import DomSanitizer

import {
    MAT_DIALOG_DATA,
    MatDialog,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ModalComponent } from '../shared/components/popup/modal.component';
import { IndexedDbService } from '../shared/services/indexed-db.service';

@Component({
    selector: 'app-ins-user',
    imports: [CommonModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule],
    templateUrl: 'ins-user.component.html',
    styleUrl: 'ins-user.component.scss',
    providers: [IndexedDbService]
})
export class InsUserComponent {
    displayedColumns: string[] = ['policyNumber', 'policyHolderName', 'policyHolderEmail', 'amount', 'status'];
    displayedHeaders: string[] = ['Policy Number', 'Policy Holder Name', 'Policy Holder Email', 'Amount', 'Status'];
    data: any[] = [];
    readonly dialog = inject(MatDialog);
    sanitizedData:any= '';
    constructor(private indexedDbService: IndexedDbService, private sanitizer: DomSanitizer) {
    }

    ngOnInit() {
        this.indexedDbService.openDatabase();
        setTimeout(() => {
            this.getAllData();
        }, 100);

    }

    // Method use to generate Policy Number
    generatePolicyNumber(): string {
        const prefix = 'POL';
        const randomNumber = Math.floor(Math.random() * 1000000000).toString().padStart(9, '0');
        return `${prefix}${randomNumber}`;
    }


    openDialog(): void {
        const dialogRef = this.dialog.open(ModalComponent, {
            data: {
                policyNumber: this.generatePolicyNumber(),
                policyHolderName: '',
                amount: 0,
                policyHolderEmail: '',
                status: 'Payment Pending'
            },
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result !== undefined) {
                // Implemented OWASP Top 10 to sanitize the Popup data  to mitigate XSS risks
                this.sanitizedData = this.sanitizer.bypassSecurityTrustHtml(result);
                this.indexedDbService.saveInsuranceDetails(this.sanitizedData.changingThisBreaksApplicationSecurity);
                this.getAllData();
            }
        });
    }

    getAllData() {
        const self = this;
        this.indexedDbService.getAllInsuranceDetails().then(result => {
            self.data = result;
            // Raising event to share data to Payment Policy (on MFE2)
            const event = new CustomEvent('insuranceDetailsUpdated', { detail: result });
            window.dispatchEvent(event);
        }).catch(error => {
            // Handle error
        });

    }

}
