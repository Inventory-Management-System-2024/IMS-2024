import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
//import any from '../interfaces/any';
// import {process} from 

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private _url: string = "http://localhost:3000/products";

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = 'eyJhbGciOiJIUzI1NiJ9.YW5hZGloaXJwYXJhMDAzNkBnbWFpbC5jb20.E3NXa9d7-69qF0DjmiBBYzvPsUdB-2woAMlA__zRPjE';
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getAllProducts(): Observable<any[]> {
    return this.http.get<any[]>(this._url, { headers: this.getHeaders() });
  }
  getProduct(id: number): Observable<any> {
    return this.http.get<any>(`${this._url}/${id}`, { headers: this.getHeaders() });
  }

  addProduct(any: any): Observable<any> {
    return this.http.post<any>(`${this._url}`, any, { headers: this.getHeaders() });
  }

  updateProduct(id: number, any: any): Observable<any> {
    return this.http.put<any>(`${this._url}/${id}`, any, { headers: this.getHeaders() });
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete<any>(`${this._url}/${id}`, { headers: this.getHeaders() });
  }
}





