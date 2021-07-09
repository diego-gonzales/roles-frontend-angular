import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { SalesResponse, Sale } from '../interfaces/sale-response.interface';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  private _salesUrl: string = `${environment.base_url}/sales`;


  constructor( private http: HttpClient ) { }


  getSales(): Observable<Sale[]> {
    return this.http.get<SalesResponse>(`${this._salesUrl}`)
               .pipe(
                 map( resp => resp.sales )
               );
  };

  getSale(idSale: string): Observable<Sale> {
    return this.http.get<SalesResponse>(`${this._salesUrl}/${idSale}`)
               .pipe(
                 map( resp => resp.sale )
               );
  };

  

}
