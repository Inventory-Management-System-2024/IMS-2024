import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { GlobalErrorHandlerService, AuthGuardService } from '../services';
import OrderElement from '../interfaces/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private _url: string = "http://localhost:3000/order";
  private headers?: HttpHeaders;
  constructor(private http: HttpClient, private err: GlobalErrorHandlerService, private authService: AuthGuardService) {
  }

  getAllOrders(): Observable<any[]> {
    this.headers = this.authService.getHeaders();
    return this.http.get<OrderElement[]>(this._url, { headers: this.headers }).pipe(
      catchError(this.err.handleError)
    );
  }

  getOrder(id: number): Observable<OrderElement> {
    this.headers = this.authService.getHeaders();
    return this.http.get<OrderElement>(`${this._url}/${id}`, { headers: this.headers }).pipe(
      catchError(this.err.handleError)
    );
  }

  addOrder(order: any): Observable<any> {
    this.headers = this.authService.getHeaders();
    return this.http.post<any>(`${this._url}`, order, { headers: this.headers }).pipe(
      catchError(this.err.handleError)
    );
  }

  updateOrder(id: number, order: OrderElement): Observable<OrderElement> {
    this.headers = this.authService.getHeaders();
    return this.http.put<OrderElement>(`${this._url}/${id}`, order, { headers: this.headers }).pipe(
      catchError(this.err.handleError)
    );
  }

  deleteOrder(id: number): Observable<OrderElement> {
    this.headers = this.authService.getHeaders();
    return this.http.delete<OrderElement>(`${this._url}/${id}`, { headers: this.headers }).pipe(
      catchError(this.err.handleError)
    );;
  }
}
