import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {
  private _CountryUrl: string="https://countriesnow.space/api/v0.1/countries/";
  private _StateUrl: string="https://api.countrystatecity.in/v1/countries"
  private apiKey: string ='eUFFZGU5ZmlSMTVWbFZia2I0RERuTE41QjhVMkNRVzFpNkpVeGZOMQ==';
    constructor(private http: HttpClient) { }
    getCountries(): Observable<any[]>{
      let headers = new HttpHeaders({
        'X-CSCAPI-KEY': ` ${this.apiKey}`,
      });
      return this.http.get<any[]>(this._CountryUrl,{headers});
    }
    getStateByCountry(country_code:any): Observable<any[]>{
      console.log(country_code);
      
      let headers = new HttpHeaders({
        'X-CSCAPI-KEY': ` ${this.apiKey}`,
      });
      // console.log("Hello"+ `${this._StateUrl}/${country_code}/states`);
      
      return this.http.get<any[]>(`${this._StateUrl}/${country_code}/states`,{headers});
    }

    getCityByState(country_code:any,state_code:any):Observable<any[]>{
      // console.log(country_code);
      // console.log(state_code);
      const headers = new HttpHeaders({
        'X-CSCAPI-KEY': ` ${this.apiKey}`,
      });
      return this.http.get<any[]>(`${this._StateUrl}/${country_code}/states/${state_code}/cities`,{headers});
    }
}
