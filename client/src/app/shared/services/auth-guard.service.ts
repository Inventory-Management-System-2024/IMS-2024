import { Injectable } from '@angular/core';
import { RegisterService } from './register.service';
import { Router } from '@angular/router';
;
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private route: Router) { }
  canActivate(): boolean {
    const authToken = sessionStorage.getItem('token');
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
}
