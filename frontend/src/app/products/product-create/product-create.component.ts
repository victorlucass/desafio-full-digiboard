import { Component } from '@angular/core';
import { ProductsService } from '../products.service';
import { Product } from '../product.model';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss']
})
export class ProductCreateComponent {
  productForm: FormGroup;

  constructor(private fb: FormBuilder, private productService: ProductsService, private router: Router) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      code: ['', Validators.required],
      description: ['', Validators.required],
      expiryDate: [new Date().toISOString(), Validators.required],
      stock: ['', [Validators.required, Validators.min(0)]],
      price: ['', [Validators.required, Validators.min(0)]],
      imgUrl: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.productForm.valid) {
      this.productService.createProduct({
        ...this.productForm.value,
        expiryDate: new Date(this.productForm.value.expiryDate).toISOString(),
        entryDate: new Date().toISOString()
      }).subscribe(() => {
        this.router.navigate(['/store']);
      })
    }
  }
}
