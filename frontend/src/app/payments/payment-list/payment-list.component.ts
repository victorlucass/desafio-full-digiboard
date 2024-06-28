import { Component, OnInit } from '@angular/core';
import { PaymentsService } from '../payments.service';
import { Payment } from '../payment.model';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.scss']
})
export class PaymentListComponent implements OnInit {
  payments: Payment[] = [];

  constructor(private paymentsService: PaymentsService) {}

  ngOnInit(): void {
    this.paymentsService.getPayments().subscribe(payments => {
      this.payments = payments;
    });
  }
}
