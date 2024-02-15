import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-user-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './user-navbar.component.html',
  styleUrl: './user-navbar.component.css'
})
export class UserNavbarComponent {
  isAdmin!: boolean;
  constructor(@Inject(PLATFORM_ID) private platformId: Object,private route:Router) { }
  name!: string | null;
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.name= localStorage.getItem('name');
      const userRole = sessionStorage.getItem('email');
      console.log(userRole);

      if (userRole==="admin@gmail.com") {

        this.isAdmin = true;
        this.route.navigate(['dashboard'])

      }
      else {
        this.isAdmin = false;
      }

    }

  }
  logout() {
    sessionStorage.clear();
    localStorage.clear();
  }
}
