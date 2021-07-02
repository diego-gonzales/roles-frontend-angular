import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log('Pasó por el interceptor')
    const token = localStorage.getItem('token');

    if (!token) return next.handle(request);

    const requestCloned = request.clone({
      headers: request.headers.set('Authorization', `Bearer ${token}`)
    });

    return next.handle(requestCloned);

    // Podemos manejar aquí mismo el error, con un pipe de rxjs, pero mejor creamos
    // un interceptor por separado

  };
}
