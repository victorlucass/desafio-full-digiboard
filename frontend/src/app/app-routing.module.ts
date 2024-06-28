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

import { UserResolver } from './users/user-resolver.service';
import { ProductResolver } from './products/product-resolver.service';
import { PaymentResolver } from './payments/payment-resolver.service';
import { StoreComponent } from './store/store.component';
import { LoginCreateComponent } from './auth/login-create/login-create.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '', component: HomeComponent, canActivate: [AuthGuard], children: [
      { path: 'users', component: UserListComponent, resolve: { users: UserResolver } },
      { path: 'store', component: StoreComponent },
      { path: 'users/create', component: UserCreateComponent },
      { path: 'products', component: ProductListComponent, resolve: { products: ProductResolver } },
      { path: 'products/create', component: ProductCreateComponent },
      { path: 'payments', component: PaymentListComponent, resolve: { payments: PaymentResolver } },
      { path: 'payments/create', component: PaymentCreateComponent },
      { path: '', redirectTo: 'store', pathMatch: 'full' }
    ]
  },
  { path: 'create-user', component: LoginCreateComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
