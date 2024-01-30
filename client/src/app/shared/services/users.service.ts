import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { GlobalErrorHandlerService } from './global-error-handler.service';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private _url : string =  "http://localhost:3000/user";

  constructor(private http : HttpClient,private err:GlobalErrorHandlerService) { }

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this._url}s`,{headers:{"Authorization":"Bearer eyJhbGciOiJIUzI1NiJ9.amF5QGdtYWlsLmNvbQ.TFD4-NTMYndZidUHXAcde3WCHHSNIluVFmEA6Pdh-vk"}}).pipe(catchError(this.err.handleError));
  }

  getUser(id: number): Observable<any>{
    return this.http.get<any>(`${this._url}/${id}`).pipe(catchError(this.err.handleError));
  }

  updateUser(id : number, user : any): Observable<any>{
    return this.http.put<any>(`${this._url}/${id}`,user).pipe(catchError(this.err.handleError));
  }

  deleteUser(id : number): Observable<any>{
    return this.http.delete<any>(`${this._url}/${id}`,{headers:{"Authorization":"Bearer eyJhbGciOiJIUzI1NiJ9.amF5QGdtYWlsLmNvbQ.TFD4-NTMYndZidUHXAcde3WCHHSNIluVFmEA6Pdh-vk"}}).pipe(catchError(this.err.handleError));
  }
}