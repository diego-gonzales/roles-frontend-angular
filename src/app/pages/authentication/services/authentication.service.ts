import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, map, catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { AuthResponse } from '../interfaces/auth.interface';
import { Observable, of } from 'rxjs';
import { CurrentUser } from '../interfaces/current-user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private _urlAPI: string = environment.base_url;
  private _currentUser: CurrentUser;
  get currentUser() {
    return {...this._currentUser};
  };

  constructor( private http: HttpClient ) { }


  signIn(username: string, password: string): Observable<string> {
    return this.http.post<AuthResponse>(`${this._urlAPI}/auth/signin`, {username, password} )
               .pipe(
                 tap( resp => {
                   if (resp && resp.access_token) {
                     localStorage.setItem('token', resp.access_token);
                   };
                 }),
                 map( resp => resp.access_token )
               );
  };

  signUp(username: string, email: string, password: string): Observable<string> {
    return this.http.post<AuthResponse>(`${this._urlAPI}/auth/signup`, {username, email, password} )
               .pipe(
                 tap( resp => {
                   if (resp && resp.access_token) {
                     localStorage.setItem('token', resp.access_token)
                   };
                 }),
                 map( resp => resp.access_token )
               )
  };

  isAuthenticated(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders()
          .set('Authorization', `Bearer ${token}`);

    return this.http.get<AuthResponse>(`${this._urlAPI}/auth/renew-token`, { headers } )
               .pipe(
                 tap( resp => {
                   if (resp.access_token) {
                     localStorage.setItem('token', resp.access_token);
                     this._currentUser = this.decodedJWT(resp.access_token);
                   };
                 }),
                 map( resp => true),
                 catchError( err => {
                   this.logout(); // importante poner esto para que funcione el 'protect-auth' guard.
                   return of(false)
                 })
               );
  };

  logout(): void {
    localStorage.removeItem('token');
  };

  decodedJWT( token: string ) {
    const payload = token.split('.')[1];
    const payloadDecoded = atob(payload);
    return JSON.parse(payloadDecoded);
  };

  // método que me sirve para evitar mostrar las opciones de 'edit' y 'delete' en los distintos módulos
  isAdmin(): boolean {
    const { roles } = this.currentUser;
    return (roles.includes('admin')) ? true : false;
  };

  // método que me servirá para el guard 'NoUserGuard'
  isUser(): boolean {
    const { roles } = this.currentUser;
    return (roles.includes('user')) ? true : false;
  };
}
