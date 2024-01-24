import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import {process} from 

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private _url : string =  "http://localhost:3000/order";

  constructor(private http : HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = 'eyJhbGciOiJIUzI1NiJ9.bmFtcmFqb3NoaTIzMDNAZ21haWwuY29t.n4uKz_VGpans0qoD-4iQmkHREiNW4YYUcKOIgsgUMjY';
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getAllOrders(): Observable<any[]> {
    return this.http.get<any[]>(this._url,{ headers: this.getHeaders() });
  }

  getOrder(id: number): Observable<any>{
    return this.http.get<any>(`${this._url}/${id}`,{ headers: this.getHeaders() });
  }

  addOrder(order : any): Observable<any>{
    return this.http.post(`${this._url}`, order, { headers: this.getHeaders() });
  }

  updateOrder(id : number, order : any): Observable<any>{
    return this.http.put<any>(`${this._url}/${id}`,order,{ headers: this.getHeaders() });
  }

  deleteOrder(id : number): Observable<any>{
    return this.http.delete<any>(`${this._url}/${id}`,{ headers: this.getHeaders() });
  }
}
