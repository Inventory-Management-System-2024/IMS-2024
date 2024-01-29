import { Component, Inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableModule, MatTableDataSource} from '@angular/material/table';
import {MatSortModule, MatSort} from '@angular/material/sort';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { OrderService } from '../../shared/services/order.service';
import {  
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose, } from '@angular/material/dialog'
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';


export interface OrderElement {
  user: {
    name : String,
    email : String
  };
  orderItems : [{
    quantity : number,
    product : {
      productName : String,
    }
    _id : string
  }],
  orderStatus: string;
  totalPrice: number;
  paidAt : String;
}


export interface DialogData {
  animal: string;
  name: string;
}




@Component({
  selector: 'app-order',
  standalone: true,
  imports: [MatTableModule, NavbarComponent, MatSortModule, CommonModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent {
  displayedColumns: string[] = ['user', 'orderItems', 'orderStatus', 'totalPrice', 'paidAt', 'actions'];
  dataSource
  name : string = "";
  animal : string = "";
  constructor(private orderservice : OrderService, private dialog : MatDialog) {
    this.dataSource = orderservice.getAllOrders()
    this.sort = new MatSort()
  }
  
  @ViewChild(MatSort) sort: MatSort;


  edit(){
    this.dialog.open(OrderDialog, {
      data: {name: this.name, animal: this.animal},
    })
  }
  // ngAfterViewInit() {
  //   this.dataSource.sort = this.sort;    
  // }

}

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,],
  templateUrl: './order.dialog.html',
  styleUrl: './order.component.css'
})
export class OrderDialog {
  constructor(
    public dialogRef: MatDialogRef<OrderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}