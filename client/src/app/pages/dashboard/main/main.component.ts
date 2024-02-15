import { Component } from '@angular/core';
import { CardsComponent } from './cards/cards.component';
import { DatePipe } from '@angular/common';
import { GraphComponent } from './graph/graph.component';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { OrderService } from '../../../shared/services';

export interface OrderElement {
  user: {
    name: String,
    email: String
  },
  orderItems: [{
    quantity: number,
    product: {
      productName: String,
    }
    _id: string
  }],
  orderStatus: string;
  totalPrice: number;
  paidAt: String;

}


@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CardsComponent, DatePipe, GraphComponent, MatTableModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  currentDate: Date = new Date();
  allOrders: any;
  orderDetails: any;
  displayedColumns: string[] = ['user', 'orderItems', 'orderStatus'];
  dataSource: any;

  constructor(private orderservice: OrderService) {

    orderservice.getAllOrders().subscribe((res) => {
      this.dataSource = new MatTableDataSource(res)

    })
  }
}
