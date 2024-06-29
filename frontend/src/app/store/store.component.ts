import { Component } from '@angular/core';
import { Product } from '../products/product.model';
import { ProductsService } from '../products/products.service';
import { PaymentsService } from '../payments/payments.service';
import { User } from '../users/user.model';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss'],
})
export class StoreComponent {
  products!: Product[];
  quantities: { [productId: string]: number } = {};
  user!: User;

  constructor(
    private productService: ProductsService,
    private paymentsService: PaymentsService
  ) {}

  ngOnInit() {
    this.productService
      .getProducts()
      .subscribe((data) => {
        this.products = data;
        this.products.forEach((product) => {
          this.quantities[product.id] = 0;
        });
      });
    if (localStorage.getItem('user')) {
      this.user = JSON.parse(localStorage.getItem('user')!);
      console.log(this.user.id);
    }
  }

  getSeverity(product: Product) {
    if (product.stock > 0) {
      return 'success';
    } else if (product.stock <= 10 && product.stock > 0) {
      return 'warning';
    } else if (product.stock === 0) {
      return 'danger';
    }

    return '';
  }

  getTotalPrice(product: Product): number {
    return this.quantities[product.id] * product.price;
  }

  toPayment(product: Product) {
    const quantity = this.quantities[product.id] || 0;

    if (quantity > 0) {
      this.paymentsService
        .createPayment({
          userId: this.user.id,
          productId: product.id,
          quantity: quantity,
        })
        .subscribe(() => {
          this.quantities[product.id] = 0;
          this.ngOnInit();
        });
    }
  }

  validateExpiration(product: Product) {
    return product.expiryDate < new Date().toISOString();
  }
}
