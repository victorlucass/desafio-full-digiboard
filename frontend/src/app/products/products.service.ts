import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './product.model';
import { environment } from '../../environments/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  
  private apiUrl = `${environment.apiUrl}/products`;

  constructor(private http: HttpClient) {}

  // Método para obter a lista de produtos
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  // Método para obter um produto pelo ID
  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  // Método para deletar um produto pelo ID
  deleteProduct(id: string): Observable<Product> {
    return this.http.delete<Product>(`${this.apiUrl}/${id}`);
  }

  // Método para criar um novo produto
  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  // Método para atualizar um produto pelo ID
  updateProduct(id: string, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, product);
  }
}
