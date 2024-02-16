import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../../states/app.state';
import { selectCountProducts } from '../../../states/cart/cart.selector';

@Component({
  selector: 'app-user-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './user-navbar.component.html',
  styleUrl: './user-navbar.component.css'
})
export class UserNavbarComponent {
  isAdmin!: boolean;
  countProducts$: Observable<number>;
  constructor(@Inject(PLATFORM_ID) private platformId: Object,private route:Router,private store : Store<AppState>) {
    this.countProducts$=store.select(selectCountProducts)
   }
  name!: string | null;
  token! : string | null;

  isLoggedIn: boolean = false;
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.token = sessionStorage.getItem('token');
      this.name= sessionStorage.getItem('name');
      const userRole = sessionStorage.getItem('email');
      console.log(userRole);




      if(this.token)
      {
        this.isLoggedIn = true;
      }
      

      if (userRole === "admin@gmail.com") {

        this.isAdmin = true;
        this.route.navigate(['dashboard'])

      }
      else {
        this.isAdmin = false;
      }

    }

  }


  navigateToLogin(){
    this.route.navigate(['/login']);
  }

  logout() {
    this.isLoggedIn = false;
    sessionStorage.clear();
    localStorage.clear();
  }
}
