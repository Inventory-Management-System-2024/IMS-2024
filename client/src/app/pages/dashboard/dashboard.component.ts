import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProductsComponent } from '../products/products.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ProductsComponent, NavbarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  arr: any[] = [
    { property: "Total Expenses", price: '$58,420' },
    { property: "Gross Profit", price: '$237,813' }
  ];

}
