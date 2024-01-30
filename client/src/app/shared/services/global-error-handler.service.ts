import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandlerService {

  constructor() { }
  handleError(error: HttpErrorResponse) {
    let errmsg="";
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      errmsg=`An error occurred: ${error.error}`;
      console.error('An error occurred:', error.error);
    } else {
      errmsg=`Backend returned code ${error.status}, body was: ${error.error} `;
      console.error(`Backend returned code ${error.status}, body was: `, error.error);
    }
    
    errmsg+='Something bad happened; please try again later.'
    return throwError(() => new Error(errmsg));
  }
}
