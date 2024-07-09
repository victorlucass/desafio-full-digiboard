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
import { StoreComponent } from './store/store.component';
import { LoginCreateComponent } from './auth/login-create/login-create.component';

import { UserResolver } from './users/user-resolver.service';
import { ProductResolver } from './products/product-resolver.service';
import { PaymentResolver } from './payments/payment-resolver.service';

const routes: Routes = [
  // Rota para login
  { path: 'login', component: LoginComponent },
  // Rota protegida que exige autenticação
  {
    path: '', component: HomeComponent, children: [
      // Rota para listar usuários
      { path: 'users', component: UserListComponent, canActivate: [AuthGuard], resolve: { users: UserResolver } },
      // Rota para criar usuário
      { path: 'users/create', component: UserCreateComponent, canActivate: [AuthGuard] },
      // Rota para editar usuário
      { path: 'users/:id', component: UserCreateComponent, canActivate: [AuthGuard] },
      // Rota para a loja
      { path: 'store', component: StoreComponent, canActivate: [AuthGuard] },
      // Rota para listar produtos
      { path: 'products', component: ProductListComponent, canActivate: [AuthGuard], resolve: { products: ProductResolver } },
      // Rota para criar produto
      { path: 'products/create', component: ProductCreateComponent, canActivate: [AuthGuard], },
      // Rota para editar produto
      { path: 'product/:id', component: ProductCreateComponent, canActivate: [AuthGuard] },
      // Rota para listar pagamentos
      { path: 'payments', component: PaymentListComponent, resolve: { payments: PaymentResolver }, canActivate: [AuthGuard], },
      // Rota padrão redirecionando para a loja
      { path: '', redirectTo: 'store', pathMatch: 'full' }
    ]
  },
  // Rota para criar usuário (acessível sem login)
  { path: 'create-user', component: LoginCreateComponent },
  // Rota para redirecionamento em caso de rota não encontrada
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
