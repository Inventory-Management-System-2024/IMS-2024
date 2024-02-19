import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { MainComponent } from './main/main.component';
import { GraphComponent } from './main/graph/graph.component';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MainComponent, NavbarComponent, FooterComponent, GraphComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  arr: any[] = [
    { property: "Total Expenses", price: '$58,420' },
    { property: "Gross Profit", price: '$237,813' }
  ];

}
