import { Component } from '@angular/core';
import { PolicyPaymentComponent } from './policy-payment/policy-payment.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  imports: [PolicyPaymentComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ins-web-mfe2';
}
