import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentListComponent } from './payment-list/payment-list.component';
import { PaymentCreateComponent } from './payment-create/payment-create.component';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { ChipModule } from 'primeng/chip';
import { TagModule } from 'primeng/tag';


@NgModule({
  declarations: [
    PaymentListComponent,
    PaymentCreateComponent,

  ],
  imports: [
    CommonModule,
    TableModule,
    FormsModule,
    ChipModule,
    TagModule
  ]
})
export class PaymentsModule { }
