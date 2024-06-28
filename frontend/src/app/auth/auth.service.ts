import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment.dev';
import { UsersService } from '../users/users.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;
  private jwtHelper = new JwtHelperService();

  constructor(
    private http: HttpClient,
    private userService: UsersService,
    private route: Router
  ) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}`, { email, password }).pipe(
      tap((response: any) => {
        localStorage.setItem('token', response.access_token);
        const pay = this.readPayload(response.access_token);
        this.userService.getUserById(pay.sub).subscribe((user) => {
          localStorage.setItem('user', JSON.stringify(user));
          this.route.navigate(['/']);
        });
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  readPayload(token: string): any {
    const pay = this.jwtHelper.decodeToken(token);
    return pay;
  }

  getPayload(): any {
    const token = localStorage.getItem('token');
    if (token) {
      return this.jwtHelper.decodeToken(token);
    }
    return null;
  }
}
