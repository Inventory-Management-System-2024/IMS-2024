import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableModule, MatTableDataSource} from '@angular/material/table';
import {MatSortModule, MatSort} from '@angular/material/sort';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { OrderService } from '../../shared/services/order.service';
export interface OrderElement {
  user: string;
  orderItems : [{
    quantity : number,
    product : string,
    _id : string
  }],
  orderStatus: string;
  totalPrice: number;
  paidAt : String;
}





@Component({
  selector: 'app-order',
  standalone: true,
  imports: [MatTableModule, NavbarComponent, MatSortModule, CommonModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent {
  displayedColumns: string[] = ['user', 'orderItems', 'orderStatus', 'totalPrice', 'paidAt'];
  dataSource
  
  constructor(orderservice : OrderService) {
    this.dataSource = orderservice.getAllOrders()
    this.sort = new MatSort()
  }

  @ViewChild(MatSort) sort: MatSort;

  // ngAfterViewInit() {
  //   this.dataSource.sort = this.sort;    
  // }

}

