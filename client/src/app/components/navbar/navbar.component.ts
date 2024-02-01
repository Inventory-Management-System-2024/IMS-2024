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
  name: string | null = localStorage.getItem('name');
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const userRole = sessionStorage.getItem('token');
      console.log(userRole);

      if (userRole === "eyJhbGciOiJIUzI1NiJ9.amF5QGdtYWlsLmNvbQ.TFD4-NTMYndZidUHXAcde3WCHHSNIluVFmEA6Pdh-vk") {
        this.isAdmin = true;
      }
      else {
        this.isAdmin = false;
      }

    }

  }
  logout() {
    sessionStorage.clear();
  }

}
