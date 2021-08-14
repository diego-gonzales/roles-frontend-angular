import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthenticationService } from '../../pages/authentication/services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ProtectAuthGuard implements CanActivate {

  // Guard usado para proteger la pantalla de logueo y registro cuando ya un usuario se encuentra autenticado.

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

    /* Nunca entrará al 'if' si es que se modifica el token, ya que el catchError del isAuthenticated()
    primero llama al método logout(), el cual borra el token y recien envía el 'false'. Esto evitará el 
    problema de que no se mostraba ni la pantalla de login debido a que el guard recibia 'false' */
    return true;

  };

};
