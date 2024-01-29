import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private _url="http://localhost:3000/register";
  private _logURL="http://localhost:3000/login";
  private token!:string;
  constructor(private http:HttpClient) { }

  register(user : any): Observable<any>{
    return this.http.post<any>(this._url,user)
  }
  
  login(user : any): Observable<any>{
    return this.http.post<any>(this._logURL,user,{observe:'response'});
  }
}
