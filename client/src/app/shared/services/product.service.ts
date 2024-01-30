import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Product from '../interfaces/product';
// import {process} from 

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private _url : string =  "http://localhost:3000/products";

  constructor(private http : HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = 'eyJhbGciOiJIUzI1NiJ9.YW5hZGloaXJwYXJhMDAzNkBnbWFpbC5jb20.E3NXa9d7-69qF0DjmiBBYzvPsUdB-2woAMlA__zRPjE';
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this._url,{ headers: this.getHeaders() });
  }
  getProduct(id: number): Observable<Product>{
    return this.http.get<Product>(`${this._url}/${id}`,{ headers: this.getHeaders() });
  }

  addProduct(product : any): Observable<Product>{
    return this.http.post<Product>(`${this._url}`, product, { headers: this.getHeaders() });
  }

  updateProduct(id : number, product : any): Observable<Product>{
    return this.http.put<Product>(`${this._url}/${id}`,product,{ headers: this.getHeaders() });
  }

  deleteProduct(id : number): Observable<Product>{
    return this.http.delete<Product>(`${this._url}/${id}`,{ headers: this.getHeaders() });
  }
}





