import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from '../../pages/authentication/services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class NoUserGuard implements CanActivate {

  constructor(private authenticationService: AuthenticationService,
              private router: Router ) { }


  canActivate(): boolean {
    if (this.authenticationService.isUser()) {
      this.router.navigate(['/pages/dashboard']);
      return false;
    };

    return true;
  };

}
