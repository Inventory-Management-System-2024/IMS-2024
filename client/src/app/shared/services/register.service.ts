import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private _url="http://localhost:3000/register";
  constructor(private http:HttpClient) { }

  register(user : any): Observable<any>{
    return this.http.post<any>(this._url,user)
  }
}
