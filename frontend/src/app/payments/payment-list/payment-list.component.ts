import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Payment } from '../payment.model';


@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.scss']
})
export class PaymentListComponent implements OnInit {
  payments: Payment[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.loadPayments();
  }

  // Método para carregar pagamentos a partir dos dados da rota
  private loadPayments(): void {
    this.route.data.subscribe((data) => {
      const { payments } = data;
      this.payments = payments;
    });
  }
}
