import { Component, OnInit } from '@angular/core';
import { Product } from '../products/product.model';
import { ProductsService } from '../products/products.service';
import { PaymentsService } from '../payments/payments.service';
import { User } from '../users/user.model';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss'],
})
export class StoreComponent implements OnInit {
  products: Product[] = [];
  quantities: { [productId: string]: number } = {};
  user: User | null = null;
  searchControl = new FormControl();
  
  options = [
    {
      label: 'Produtos expirados',
      value: 'expired',
    },
    {
      label: 'Produtos disponíveis',
      value: 'available',
    },
  ];

  option?: {
    label: string;
    value: string;
  };

  constructor(
    private productService: ProductsService,
    private paymentsService: PaymentsService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadUser();

    this.searchControl.valueChanges.pipe(
      debounceTime(1000) // Adiciona um delay de 1 segundo
    ).subscribe(value => {
      this.filterProducts(value);
    });
  }

  // Método para carregar produtos
  private loadProducts(query?: string): void {
    this.productService.getProducts(query).subscribe((data) => {
      this.products = data;
      this.initializeQuantities();
    });
  }

  filterProducts(query?: string): void {
    switch (this.option?.value) {
      case 'expired':
        this.productService.getExpiredProducts(query).subscribe((data) => {
          this.products = data;
        })
        break;
      case 'available':
        this.productService.getAvailableProducts(query).subscribe((data) => {
          this.products = data;
        })
        break;
      default:
        this.loadProducts(query);
        break;
    }
   
  }

  handleOption(): void {
    this.filterProducts(this.searchControl.value);
  }

  handlerClean(): void {
    this.loadProducts();
  }

  // Método para inicializar as quantidades de produtos
  private initializeQuantities(): void {
    this.products.forEach((product) => {
      this.quantities[product.id] = 0;
    });
  }

  // Método para carregar usuário do localStorage
  private loadUser(): void {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      this.user = JSON.parse(userJson);
    }
  }

  // Método para determinar a severidade do estoque do produto
  getSeverity(product: Product): string {
    if (product.stock > 10) {
      return 'success';
    } else if (product.stock > 0) {
      return 'warning';
    } else {
      return 'danger';
    }
  }

  // Método para calcular o preço total dos produtos selecionados
  getTotalPrice(product: Product): number {
    return this.quantities[product.id] * product.price;
  }

  // Método para realizar o pagamento
  toPayment(product: Product): void {
    const quantity = this.quantities[product.id] || 0;

    if (quantity > 0 && this.user) {
      this.paymentsService
        .createPayment({
          userId: this.user.id,
          productId: product.id,
          quantity: quantity,
        })
        .subscribe(() => {
          this.quantities[product.id] = 0;
          this.loadProducts(); // Recarregar produtos para atualizar o estoque
          this.router.navigate(['/payments']).then(() => {
            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: 'Pagamento realizado com sucesso!',
            });
          });
        });
    }
  }

  // Método para validar a data de validade do produto
  validateExpiration(product: Product): boolean {
    return product.expiryDate < new Date().toISOString();
  }
}
