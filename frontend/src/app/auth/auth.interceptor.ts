import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Recupera o token do localStorage
    const token = localStorage.getItem('token');

    // Se o token existir, clona a requisição e adiciona o header de autorização
    if (token) {
      const clonedRequest = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`),
      });

      return next.handle(clonedRequest);
    } else {
      // Se não houver token, continua com a requisição original
      return next.handle(req);
    }
  }
}
