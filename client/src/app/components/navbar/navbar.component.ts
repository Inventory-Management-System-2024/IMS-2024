import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent {
  isAdmin!: boolean;
  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }
  name!: string | null;
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.name= localStorage.getItem('name');
      const userRole = sessionStorage.getItem('email');
      console.log(userRole);

      if (userRole==="jay@gmail.com") {
        this.isAdmin = true;
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
