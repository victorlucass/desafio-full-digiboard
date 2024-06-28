import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  items = [
    {
      label: 'Usúarios',
      icon: 'pi pi-user',
      routerLink: 'users'
    },
    {
      label: 'Produtos',
      icon: 'pi pi-fw pi-box',
      routerLink: 'products'
    },
    {
      label: 'Pagamentos',
      icon: 'pi pi-fw pi-money-bill',
      routerLink: 'payments'
    }
  ];

  constructor(public authService: AuthService, private router: Router) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
