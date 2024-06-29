import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductCreateComponent } from './product-create/product-create.component';
import { TableModule } from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CardModule } from 'primeng/card';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductCreateComponent
  ],
  imports: [
    CommonModule,
    TableModule,
    FormsModule,
    ButtonModule,
    ReactiveFormsModule,
    InputTextModule,
    PasswordModule,
    CardModule,
    RouterModule,
  ]
})
export class ProductsModule { }
