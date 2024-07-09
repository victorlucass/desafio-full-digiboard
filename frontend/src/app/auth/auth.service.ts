import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment.dev';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;
  private jwtHelper = new JwtHelperService();

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  // Método para realizar login
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}`, { email, password }).pipe(
      tap((response: any) => {
        this.storeToken(response.access_token);
      })
    );
  }

  // Método para realizar logout
  logout(): void {
    this.clearLocalStorage();
    this.router.navigate(['/login']);
  }

  // Método para verificar se o usuário está autenticado
  isLoggedIn() {
    const token = localStorage.getItem('token');
    return token && !this.jwtHelper.isTokenExpired(token);
  }

  // Método para ler o payload do token JWT
  readPayload(token: string): any {
    return this.jwtHelper.decodeToken(token);
  }

  // Método para obter o token armazenado
  getToken() {
    return localStorage.getItem('token');
  }

  // Método para obter o payload do token armazenado
  getPayload(): any {
    const token = localStorage.getItem('token');
    if (token) {
      return this.readPayload(token);
    }
    return null;
  }

  // Método para armazenar o token no localStorage
  private storeToken(token: string): void {
    localStorage.setItem('token', token);
  }

  // Método para limpar o localStorage
  private clearLocalStorage(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
}
