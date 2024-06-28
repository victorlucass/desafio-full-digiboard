import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

interface MenuItem {
  label: string;
  icon: string;
  routerLink: string;
}

const LOGIN_ROUTE = '/login';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  items: MenuItem[] = [
    { label: 'Usuários', icon: 'pi pi-user', routerLink: 'users' },
    { label: 'Produtos', icon: 'pi pi-fw pi-box', routerLink: 'products' },
    { label: 'Pagamentos', icon: 'pi pi-fw pi-money-bill', routerLink: 'payments' }
  ];

  avatarGithubUrl: string = "";

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.redirectIfNotAuthenticated();
    this.loadUserAvatar();
  }

  private redirectIfNotAuthenticated(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate([LOGIN_ROUTE]);
    }
  }

  private loadUserAvatar(): void {
    const userLocalStorage = localStorage.getItem('user');
    
    if (!userLocalStorage) {
      this.clearSessionAndRedirect();
    } else {
      const user = JSON.parse(userLocalStorage);
      this.avatarGithubUrl = `https://github.com/${user.githubUsername}.png`;
    }
  }

  private clearSessionAndRedirect(): void {
    localStorage.removeItem('token');
    this.router.navigate([LOGIN_ROUTE]);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate([LOGIN_ROUTE]);
  }
}