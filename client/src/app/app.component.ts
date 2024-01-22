import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProductsComponent } from './pages/products/products.component';
import { AddProductComponent } from './pages/add-product/add-product.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { RegisterComponent } from './pages/register/register.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, LoginComponent,DashboardComponent,NavbarComponent,ProductsComponent, AddProductComponent, ProductListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'IMS';

}
