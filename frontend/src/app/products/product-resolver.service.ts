import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductsService } from './products.service';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductResolver implements Resolve<Product[]> {
  constructor(private productsService: ProductsService) {}

  // Método para resolver os dados de produtos antes da ativação da rota
  resolve(): Observable<Product[]> {
    return this.productsService.getProducts();
  }
}
