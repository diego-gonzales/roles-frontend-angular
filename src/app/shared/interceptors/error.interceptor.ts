import { catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthenticationService } from '../../pages/authentication/services/authentication.service';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor( private authenticationService: AuthenticationService,
               private router: Router ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // console.log('Error Interceptor')
    return next.handle(request)
                .pipe(
                  catchError( (err: HttpErrorResponse) => {
                    if (err.status === 401) {
                      this.authenticationService.logout();
                      this.router.navigateByUrl('/authentication/signin');
                    };

                    // Importante enviar todo el error si lo queremos usar en algún componente
                    // (ya que se podría enviar solo el mensaje)
                    return throwError(err);
                  })
                );
  };

}
