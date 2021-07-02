import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthenticationService } from '../../pages/authentication/services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ProtectAuthGuard implements CanActivate {

  constructor(private authService: AuthenticationService,
              private router: Router) { }


  canActivate(): Observable<boolean> | boolean {

    if (localStorage.getItem('token')) {
      return this.authService.isAuthenticated()
                 .pipe(
                   tap( resp => {
                     if (resp) {
                       this.router.navigateByUrl('/pages/dashboard');
                     };
                   })
                 )
    };

    return true;

  };

};
