import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserCreateComponent } from './users/user-create/user-create.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductCreateComponent } from './products/product-create/product-create.component';
import { PaymentListComponent } from './payments/payment-list/payment-list.component';
import { PaymentCreateComponent } from './payments/payment-create/payment-create.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent, canActivate: [AuthGuard], children: [
    { path: 'users', component: UserListComponent },
    { path: 'users/create', component: UserCreateComponent },
    { path: 'products', component: ProductListComponent },
    { path: 'products/create', component: ProductCreateComponent },
    { path: 'payments', component: PaymentListComponent },
    { path: 'payments/create', component: PaymentCreateComponent },
    { path: '', redirectTo: 'users', pathMatch: 'full' }
  ] },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
