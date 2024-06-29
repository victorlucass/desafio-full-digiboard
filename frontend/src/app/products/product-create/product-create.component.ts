import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { addDays, format, parseISO } from 'date-fns';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss'],
})
export class ProductCreateComponent implements OnInit {
  productForm: FormGroup;
  title = 'Cadastrar Produto';
  idProduct: string | null = null;

  constructor(
    private fb: FormBuilder,
    private productService: ProductsService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {
    this.productForm = this.createForm();
    this.idProduct = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    if (this.idProduct) {
      this.title = 'Atualizar Produto';
      this.loadProduct();
    }
  }

  // Método para criar o formulário
  private createForm(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      code: ['', Validators.required],
      description: ['', Validators.required],
      expiryDate: ['', Validators.required],
      stock: ['', [Validators.required, Validators.min(0)]],
      price: ['', [Validators.required, Validators.min(0)]],
      imgUrl: ['', Validators.required],
    });
  }

  // Método para carregar os dados do produto
  private loadProduct(): void {
    this.productService.getProductById(this.idProduct!).subscribe((product) => {
      this.productForm.patchValue({
        ...product,
        expiryDate: format(parseISO(product.expiryDate), 'yyyy-MM-dd'),
      });
    });
  }

  // Método para submissão do formulário
  onSubmit(): void {
    if (this.productForm.valid) {
      if (this.idProduct) {
        this.updateProduct();
      } else {
        this.createProduct();
      }
    }
  }

  // Método para atualizar o produto
  private updateProduct(): void {
    this.productService.updateProduct(this.idProduct!, {
      ...this.productForm.value,
      expiryDate: addDays(new Date(this.productForm.value.expiryDate).toISOString(), 1),
      entryDate: new Date().toISOString(),
    }).subscribe(() => {
      this.router.navigate(['/store']);
      this.messageService.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Produto atualizado com sucesso!',
      })
    }, (_error) => {
      const { error } = _error;
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: error.message,
      });
    });
  }

  // Método para criar o produto
  private createProduct(): void {
    this.productService.createProduct({
      ...this.productForm.value,
      expiryDate: addDays(new Date(this.productForm.value.expiryDate).toISOString(), 1),
      entryDate: new Date().toISOString(),
    }).subscribe(() => {
      this.router.navigate(['/store']);
      this.messageService.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Produto criado com sucesso!',
      })
    }, (_error) => {
      const { error } = _error;
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: error.message,
      });
    });
  }
}
