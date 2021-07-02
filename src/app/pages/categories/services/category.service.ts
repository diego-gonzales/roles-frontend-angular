import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { CategoryResponse, Category } from '../interfaces/category-response.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private _urlAPI: string = environment.base_url;


  constructor( private http: HttpClient ) { }


  getCategories(): Observable<Category[]> {
    return this.http.get<CategoryResponse>(`${this._urlAPI}/categories`)
               .pipe(
                 map( resp => {
                   return resp.categories;
                 })
               );
  };

  getCategory(idCategory: string): Observable<Category> {
    return this.http.get<CategoryResponse>(`${this._urlAPI}/categories/${idCategory}`)
               .pipe(
                 map( resp => resp.category )
               );
  };

  postCategory(newCategory: Category): Observable<Category> {
    return this.http.post<CategoryResponse>(`${this._urlAPI}/categories`, newCategory)
               .pipe(
                 map( resp => resp.category)
               );
  };

  updateCategory(idCategory: string, updatedCategory: Category): Observable<Category> {
    return this.http.patch<CategoryResponse>(`${this._urlAPI}/categories/${idCategory}`, updatedCategory)
               .pipe(
                 map( resp => resp.category)
               );
  };

  deleteCategory(idCategory: string) {
    return this.http.delete(`${this._urlAPI}/categories/${idCategory}`);
  };

  getCategoryNames(): Observable<string[]> {
    return this.http.get<CategoryResponse>(`${this._urlAPI}/categories`)
               .pipe(
                 map( resp => {
                   return resp.categories.map( category => category.name)
                 })
               );
  };

}
