import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../../pages/authentication/services/authentication.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor( private authService: AuthenticationService,
               private router: Router ) { }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.authService.isAuthenticated()
               .pipe(
                 tap( resp => {
                   if (!resp) {
                     this.router.navigateByUrl('/authentication/signin');
                   };
                 })
               );
  };

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | boolean {
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
