import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

private apiUrl = `${environment.apiUrl}/auth`;
  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}`, { email, password }).pipe(
      tap((response: any) => {
        localStorage.setItem('token', response.access_token);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getPayload(): any {
    const token = localStorage.getItem('token');
    if (token) {
      return this.jwtHelper.decodeToken(token);
    }
    return null;
  }
}
