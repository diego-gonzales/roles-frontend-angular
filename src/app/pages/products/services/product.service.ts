import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Product, ProductsResponse } from '../interfaces/products-response.interface';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private _urlAPI: string = environment.base_url;


  constructor( private http: HttpClient ) { }


  getProducts(): Observable<Product[]> {
    return this.http.get<ProductsResponse>(`${this._urlAPI}/products`)
               .pipe(
                 map( resp => resp.products )
               )
  };

  getProduct(idProduct: string): Observable<Product> {
    return this.http.get<ProductsResponse>(`${this._urlAPI}/products/${idProduct}`)
               .pipe(
                 map( resp => resp.product )
               )
  };

  postProduct(newProduct: Product) {
    return this.http.post(`${this._urlAPI}/products`, newProduct)
  };

  updateProduct(idProduct: string, updatedProduct: Product) {
    return this.http.patch(`${this._urlAPI}/products/${idProduct}`, updatedProduct);
  };

  deleteProduct(idProduct: string) {
    return this.http.delete(`${this._urlAPI}/products/${idProduct}`);
  };
}
