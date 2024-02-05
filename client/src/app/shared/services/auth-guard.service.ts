import { Inject, Injectable,PLATFORM_ID, inject } from '@angular/core';
import { RegisterService } from './register.service';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
;
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private route: Router, @Inject(PLATFORM_ID) private platformId: Object, @Inject(DOCUMENT) private document: Document, @Inject('Window') private window: Window) {
    console.log(document.defaultView?.sessionStorage);
    console.log(this.window?.sessionStorage);

  }

  canActivate(): boolean {

    const authToken =  this.window.sessionStorage.getItem('token');
    if (!authToken) {
        this.route.navigate(['/'])
        return false;      
    }
    // else if(authToken!=="eyJhbGciOiJIUzI1NiJ9.amF5QGdtYWlsLmNvbQ.TFD4-NTMYndZidUHXAcde3WCHHSNIluVFmEA6Pdh-vk"){
    //   this.route.navigate(['/'])
    //   return false;
    // }

    return true;
  }
  getHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }
}
