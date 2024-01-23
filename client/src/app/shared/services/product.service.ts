import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private _url : string =  "";

  constructor(private http : HttpClient) { }

  getAllProducts(): Observable<any[]> {
    return this.http.get<any[]>(this._url);
  }

  getProduct(id: number): Observable<any>{
    return this.http.get<any>(`${this._url}/${id}`);
  }

  addProduct(product : any): Observable<any>{
    return this.http.post<any>(this._url,product)
  }

  updateProduct(id : number, product : any): Observable<any>{
    return this.http.put<any>(`${this._url}/${id}`,product);
  }

  deleteProduct(id : number): Observable<any>{
    return this.http.delete<any>(`${this._url}/${id}`);
  }

}
