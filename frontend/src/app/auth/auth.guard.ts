import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router, private messageService: MessageService) {}

  canActivate(): boolean {
      const isLoggedIn = this.authService.isLoggedIn();

      if (!isLoggedIn) {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Usuário não autenticado ou expirado' });
        this.router.navigate(['/login']);
      }
      return isLoggedIn as boolean;
  }
}
