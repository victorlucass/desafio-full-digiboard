import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { PaymentsService } from './payments.service';
import { Payment } from './payment.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentResolver implements Resolve<Payment[]> {
  constructor(private paymentsService: PaymentsService) {}

  resolve(): Observable<Payment[]> {
    return this.paymentsService.getPayments();
  }
}
