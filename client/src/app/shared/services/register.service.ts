import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,catchError } from 'rxjs';
import { GlobalErrorHandlerService } from './global-error-handler.service';
import User from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private _url="http://localhost:3000/register";
  private _logURL="http://localhost:3000/login";
  private token!:string;
  constructor(private http:HttpClient,private err: GlobalErrorHandlerService) { }

  register(user : User): Observable<User>{
    return this.http.post<User>(this._url,user).pipe(catchError(this.err.handleError));
  }
  
  login(user : User): Observable<any>{
    return this.http.post<any>(this._logURL,user,{observe:'response'}).pipe(catchError(this.err.handleError));
  }
}
