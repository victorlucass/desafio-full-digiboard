import { Component } from '@angular/core';
import { PaymentsService } from '../payments.service';
import { Payment } from '../payment.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-create',
  templateUrl: './payment-create.component.html',
  styleUrls: ['./payment-create.component.scss']
})
export class PaymentCreateComponent {
  payment: Payment = {
    productId: '',
    userId: '',
    quantity: 0
  };

  constructor(private paymentsService: PaymentsService, private router: Router) {}

  createPayment() {
    this.paymentsService.createPayment(this.payment).subscribe(() => {
      this.router.navigate(['/payments']);
    });
  }
}
