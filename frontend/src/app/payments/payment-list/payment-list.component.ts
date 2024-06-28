import { Component, OnInit } from '@angular/core';
import { PaymentsService } from '../payments.service';
import { Payment } from '../payment.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.scss']
})
export class PaymentListComponent implements OnInit {
  payments: any[] = [];
 
  constructor(private router: ActivatedRoute) {}

  ngOnInit(): void {
   this.router.data.subscribe((data: any) => {
     this.payments = data.payments
   })
  }
}
