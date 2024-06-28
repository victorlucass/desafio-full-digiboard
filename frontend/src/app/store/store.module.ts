import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreComponent } from './store.component';
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';

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
     FormsModule
  ]
})
export class StoreModule { }
