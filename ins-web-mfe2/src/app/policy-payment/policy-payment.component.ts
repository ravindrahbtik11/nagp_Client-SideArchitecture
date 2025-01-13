import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IndexedDbService } from '../shared/services/indexed-db.service';

@Component({
  selector: 'app-policy-payment',
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatSelectModule,FormsModule],
  templateUrl: './policy-payment.component.html',
  styleUrl: './policy-payment.component.scss',
  providers: [IndexedDbService],
})
export class PolicyPaymentComponent implements OnInit {
  policies: any[] = [];
  selectedPolicyDetail: any = null;
  selectedValue:any='';
  constructor(private indexedDbService: IndexedDbService) {
  }

  ngOnInit() {
    //Receiving data from MFE1
    window.addEventListener('insuranceDetailsUpdated', (event: any) => {
      console.log('Received Insurance Details:', event.detail);
      console.log(event.detail);
    });
    this.indexedDbService.openDatabase();
    setTimeout(() => {
      this.getAllData();
    }, 100);
  }

  getAllData() {
    const self = this;
    this.indexedDbService.getAllInsuranceDetails().then((result:any) => {
      if(result){
        self.policies = [];
        result.forEach((element:any) => {
          if(element && element.status !== 'Paid'){
            self.policies.push(element);
          }
        });
      }
      console.log(this.policies);
    }).catch(error => {
      // Handle error
    });

  }

  changePolicy(event: any) {
    const policyNumber = event.target.value;
    if (this.policies) {
      this.policies.find((item: any) => {
        if (item && item.policyNumber === policyNumber) {
          this.selectedPolicyDetail = item;
        }
      });
    }
  }

  updatePolicy(policyNumber: any) {
    // const data = policyNumber.target.value;
    this.indexedDbService.updateInsuranceDetails(policyNumber).then(result => {
      this.selectedPolicyDetail=null;
      console.log(result);
      this.getAllData();
    }).catch(error => {
      // Handle error
    });

  }

}
