import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { UsersResponse, User } from '../interfaces/users-response.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _usersURL: string = `${environment.base_url}/users`;


  constructor( private http: HttpClient) { }


  getUsers(): Observable<User[]> {
    return this.http.get<UsersResponse>(`${this._usersURL}`)
               .pipe(
                 map( resp => resp.users )
               );
  };

  getUser(idUser: string): Observable<User> {
    return this.http.get<UsersResponse>(`${this._usersURL}/${idUser}`)
               .pipe(
                 map( resp => resp.user )
               );
  };

  postUser(newUser: User): Observable<User> {
    return this.http.post<UsersResponse>(`${this._usersURL}`, newUser)
               .pipe(
                 map( resp => resp.user )
               );
  };

  updateUser(idUser: string, updatedUser: User): Observable<User> {
    return this.http.patch<UsersResponse>(`${this._usersURL}/${idUser}`, updatedUser)
               .pipe(
                 map( resp => resp.user )
               );
  };

  // Metodo que cambia solo la contraseña del user
  updatePasswordToUser(idUser: string, newPassword: any): Observable<User> {
    return this.http.patch<UsersResponse>(`${this._usersURL}/updatePass/${idUser}`, newPassword )
               .pipe(
                 map( resp => resp.user )
               );
  };

  deleteUser(idUser: string): Observable<User> {
    return this.http.delete<UsersResponse>(`${this._usersURL}/${idUser}`)
               .pipe(
                 map( resp => resp.user )
               );
  };
}
