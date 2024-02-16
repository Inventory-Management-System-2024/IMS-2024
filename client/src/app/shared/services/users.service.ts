import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { GlobalErrorHandlerService } from './global-error-handler.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthGuardService } from './auth-guard.service';
import User from '../interfaces/user';
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private _url : string =  "http://localhost:3000/user";
  private headers?: HttpHeaders;
  constructor(private http : HttpClient,private err:GlobalErrorHandlerService,private authService : AuthGuardService) {
    
   }

  getAllUsers(): Observable<User[]> {
    this.headers = this.authService.getHeaders();
    return this.http.get<User[]>(`${this._url}s`,{ headers: this.headers }).pipe(
      catchError(this.err.handleError)
    );
  }

  getUser(id: number): Observable<User>{
    this.headers = this.authService.getHeaders();
    return this.http.get<User>(`${this._url}/${id}`,{ headers: this.headers }).pipe(
      catchError(this.err.handleError)
    );
  }

  updateUser(id : number, user : User): Observable<User>{
    this.headers = this.authService.getHeaders();
    return this.http.put<User>(`${this._url}/${id}`,user,{ headers: this.headers }).pipe(
      catchError(this.err.handleError)
    );
  }

  deleteUser(id : number): Observable<User>{
    this.headers = this.authService.getHeaders();
    return this.http.delete<User>(`${this._url}/${id}`,{ headers: this.headers }).pipe(
      catchError(this.err.handleError)
    );
  }
}