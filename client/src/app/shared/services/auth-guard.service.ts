import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { RegisterService } from './register.service';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
;
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private route: Router,@Inject(PLATFORM_ID) private platformId: Object) { }
  canActivate(): boolean {
    let authToken;
    if (isPlatformBrowser(this.platformId)) {
      authToken = sessionStorage.getItem('token');
    }
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
