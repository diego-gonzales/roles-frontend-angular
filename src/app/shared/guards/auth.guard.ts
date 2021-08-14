import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../../pages/authentication/services/authentication.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor( private authService: AuthenticationService,
               private router: Router ) { }


  canActivate(): Observable<boolean> | boolean {
    return this.authService.isAuthenticated()
               .pipe(
                 tap( resp => {
                   if (!resp) {
                     this.router.navigateByUrl('/authentication/signin');
                   };
                 })
               );
  };

  canLoad(): Observable<boolean> | boolean {
    return this.authService.isAuthenticated()
               .pipe(
                 tap( resp => {
                   if (!resp) {
                     this.router.navigateByUrl('/authentication/signin');
                   };
                 })
               );
  };

}
