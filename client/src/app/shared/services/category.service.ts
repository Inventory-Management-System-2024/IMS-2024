import { HttpClient , } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private _url:string = "";//Your URL

  constructor(private http : HttpClient) { }

  getAllCategory() : Observable<any[]> {
    return this.http.get<any[]>(this._url);
  }

  getCategory(categoryId : number) : Observable<any[]> {
    return this.http.get<any>(`${this._url}/${categoryId}`);
  }

  addCategory(categoryData: any): Observable<any> {
    return this.http.post<any>(this._url, categoryData);
  }

  updateCategory(categoryId: number, categoryData: any): Observable<any> {
    return this.http.put<any>(`${this._url}/${categoryId}`, categoryData);
  }

  deleteCategory(categoryId: number): Observable<any> {
    return this.http.delete<any>(`${this._url}/${categoryId}`);
  }
}
