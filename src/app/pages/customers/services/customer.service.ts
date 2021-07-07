import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { environment } from 'environments/environment';
import { CustomerResponse, Customer } from '../interfaces/customer-response.interface';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private _customersUrl: string = `${environment.base_url}/customers`;


  constructor( private http: HttpClient ) { }


  getCustomers(): Observable<Customer[]> {
    return this.http.get<CustomerResponse>(`${this._customersUrl}`)
               .pipe(
                 map( resp => resp.customers )
               );
  };

  getCustomer(idCustomer: string): Observable<Customer> {
    return this.http.get<CustomerResponse>(`${this._customersUrl}/${idCustomer}`)
               .pipe(
                 map( resp => resp.customer )
               );
  };

  postCustomer(newCustomer: Customer): Observable<Customer> {
    return this.http.post<CustomerResponse>(`${this._customersUrl}`, newCustomer)
               .pipe(
                 map( resp => resp.customer )
               );
  };

  updateCustomer(idCustomer: string, updatedCustomer: Customer): Observable<Customer> {
    return this.http.patch<CustomerResponse>(`${this._customersUrl}/${idCustomer}`, updatedCustomer)
               .pipe(
                 map( resp => resp.customer )
               );
  };

  deleteCustomer(idCustomer: string): Observable<Customer> {
    return this.http.delete<CustomerResponse>(`${this._customersUrl}/${idCustomer}`)
               .pipe(
                 map( resp => resp.customer )
               );
  };

}
