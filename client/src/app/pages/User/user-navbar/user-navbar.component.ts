import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../../states/app.state';
import { selectCountProducts } from '../../../states/cart/cart.selector';
import { ToastrService } from 'ngx-toastr';
import { SharedDataService } from '../../../shared/services';
import { MatIcon } from '@angular/material/icon';



@Component({
  selector: 'app-user-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule,MatIcon],
  templateUrl: './user-navbar.component.html',
  styleUrl: './user-navbar.component.css'
})
export class UserNavbarComponent {
  isAdmin!: boolean;
  isDarkMode!: boolean;

  flag : boolean = false;

  countProducts$: Observable<number>;
  constructor(@Inject(PLATFORM_ID) private platformId: Object,private route:Router,private store : Store<AppState>,private themeService:SharedDataService) {
    this.countProducts$=store.select(selectCountProducts)
    this.isDarkMode = this.themeService.isDarkMode();
   }

  toast = inject(ToastrService);

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
      const role=sessionStorage.getItem('role');
      if (role=='admin') {

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
  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    this.themeService.setDarkMode(this.isDarkMode);
  }
  logout() {
    this.isLoggedIn = false;
    sessionStorage.clear();
    localStorage.clear();

    if(!this.flag){
      this.flag = true;
      this.route.navigate(['']);
    }
  }
  checkLoggedIn() {
    if (!this.isLoggedIn) {
      this.toast.warning("Please Login First!!!");
    } else {
      this.route.navigate(['/user_profile']);
    }
  }
}