import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { GlobalErrorHandlerService } from './global-error-handler.service';
import { AuthGuardService } from './auth-guard.service';
import { Observable, catchError } from 'rxjs';
import { GlobalErrorHandlerService } from './global-error-handler.service';
import { AuthGuardService } from './auth-guard.service';
import Product from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private _url : string =  "http://localhost:3000/products";
  private headers: HttpHeaders;
  constructor(private http : HttpClient,private err : GlobalErrorHandlerService,private authService : AuthGuardService) { 
    this.headers = this.authService.getHeaders();
  private headers: HttpHeaders;
  constructor(private http : HttpClient,private err : GlobalErrorHandlerService,private authService : AuthGuardService) { 
    this.headers = this.authService.getHeaders();
  }
  getAllProducts(): Observable<Product[]> {

    return this.http.get<Product[]>(this._url,{ headers: this.headers }).pipe(
      catchError(this.err.handleError)
    );
  }
  getProduct(id: number): Observable<Product>{
    return this.http.get<Product>(`${this._url}/${id}`,{ headers: this.headers }).pipe(

      catchError(this.err.handleError)
    );
  }  
  addProduct(product : Product): Observable<Product>{
    return this.http.post<Product>(`${this._url}`, product, { headers: this.headers }).pipe(
      catchError(this.err.handleError)
    );
  }
  updateProduct(id : number, product : Product): Observable<Product>{
    return this.http.put<Product>(`${this._url}/${id}`,product,{ headers: this.headers }).pipe(
      catchError(this.err.handleError)
    );
  }
  deleteProduct(id : number): Observable<Product>{
    return this.http.delete<Product>(`${this._url}/${id}`,{ headers: this.headers }).pipe(
      catchError(this.err.handleError)
    );
    return this.http.delete<Product>(`${this._url}/${id}`,{ headers: this.headers }).pipe(
      catchError(this.err.handleError)
    );
  }
}





