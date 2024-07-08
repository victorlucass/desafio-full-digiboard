import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreComponent } from './store.component';
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
@NgModule({
  declarations: [
    StoreComponent
  ],
  imports: [
    CommonModule,
    DataViewModule,
    ButtonModule,
    TagModule,
    InputNumberModule,
    FormsModule,
    InputTextModule,
    DropdownModule,
    ReactiveFormsModule
  ]
})
export class StoreModule { }
