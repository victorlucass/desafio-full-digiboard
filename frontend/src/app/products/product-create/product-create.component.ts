import { Component } from '@angular/core';
import { ProductsService } from '../products.service';
import { Product } from '../product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss']
})
export class ProductCreateComponent {
  // product: Product = {
  //   code: '',
  //   description: '',
  //   dateEntry: new Date(),
  //   expiration: new Date(),
  //   stock: 0
  // };

  // constructor(private productsService: ProductsService, private router: Router) {}

  // createProduct() {
  //   this.productsService.createProduct(this.product).subscribe(() => {
  //     this.router.navigate(['/products']);
  //   });
  // }
}
