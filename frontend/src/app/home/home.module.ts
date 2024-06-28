import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    MenubarModule,
    ButtonModule,
    AvatarModule,
    AvatarGroupModule
  ]
})
export class HomeModule { }
