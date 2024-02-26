import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private _url="http://localhost:3000/dashboard";
  private dataSubject = new BehaviorSubject<any>(null);
  public data$: Observable<any> = this.dataSubject.asObservable();

  constructor(private http:HttpClient) {}

  sendData(data: any) {
    this.dataSubject.next(data);
    console.log("from service",data);
    // data={};


  }

  getDashBoardData():Observable<any>{
    return this.http.get(this._url);
  }
  private darkMode = false;

  isDarkMode() {
    return this.darkMode;
  }

  setDarkMode(isDarkMode: boolean) {
    this.darkMode = isDarkMode;
    if (isDarkMode) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }

}