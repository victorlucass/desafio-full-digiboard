import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { MenuItem } from 'primeng/api';

const LOGIN_ROUTE = '/login';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  items: MenuItem[] = [
    { label: 'Loja', icon: 'pi pi-fw pi-home', routerLink: 'store' },
    { label: 'Usuários', icon: 'pi pi-user', items: [
      { label: 'Listar', icon: 'pi pi-fw pi-list', routerLink: 'users' },
      { label: 'Criar', icon: 'pi pi-fw pi-plus', routerLink: 'users/create' }
    ] },
    { label: 'Produtos', icon: 'pi pi-fw pi-box', items: [
      { label: 'Listar', icon: 'pi pi-fw pi-list', routerLink: 'products' },
      { label: 'Criar', icon: 'pi pi-fw pi-plus', routerLink: 'products/create' }
    ]},
    { label: 'Pagamentos', icon: 'pi pi-fw pi-money-bill', routerLink: 'payments' }
  ];

  avatarGithubUrl: string = "";

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.redirectIfNotAuthenticated();
    this.loadUserAvatar();
  }

  // Método para redirecionar se o usuário não estiver autenticado
  private redirectIfNotAuthenticated(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate([LOGIN_ROUTE]);
    }
  }

  // Método para carregar o avatar do usuário
  private loadUserAvatar(): void {
    const userLocalStorage = localStorage.getItem('user');
    
    if (!userLocalStorage) {
      this.clearSessionAndRedirect();
    } else {
      const user = JSON.parse(userLocalStorage);
      this.avatarGithubUrl = `https://github.com/${user.githubUsername}.png`;
    }
  }

  // Método para limpar a sessão e redirecionar para a página de login
  private clearSessionAndRedirect(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate([LOGIN_ROUTE]);
  }

  // Método para realizar logout
  logout(): void {
    this.authService.logout();
    this.router.navigate([LOGIN_ROUTE]);
  }
}
