import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { Product } from '../product.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  // Método para carregar os produtos
  private loadProducts(): void {
    this.route.data.subscribe((data: any) => {
      this.products = data.products;
    });
  }

  // Método para deletar um produto
  deleteProduct(product: Product): void {
    this.productService.deleteProduct(product.id).subscribe(() => {
      this.products = this.products.filter(p => p.id !== product.id);
    });
  }
}
