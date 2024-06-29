import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Payment } from './payment.model';
import { environment } from 'src/environments/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {
  private apiUrl = `${environment.apiUrl}/payments`;

  constructor(private http: HttpClient) {}

  // Método para obter a lista de pagamentos
  getPayments(): Observable<Payment[]> {
    return this.http.get<Payment[]>(this.apiUrl);
  }

  // Método para criar um novo pagamento
  createPayment(payment: Payment): Observable<Payment> {
    return this.http.post<Payment>(this.apiUrl, payment);
  }
}
