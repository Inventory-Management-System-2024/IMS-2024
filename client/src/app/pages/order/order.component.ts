import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { MatDialog } from '@angular/material/dialog'
import { MatDialogModule } from '@angular/material/dialog';
import { OrderService } from '../../shared/services/order.service';
import { UpdateDialogComponent } from './update-dialog/update-dialog.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { AddOrderComponent } from './add-order/add-order.component';

export interface OrderElement {
  id: number;
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
  selector: 'app-order',
  standalone: true,
  imports: [MatTableModule, NavbarComponent, MatSortModule, CommonModule, MatDialogModule, MatIconModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})

export class OrderComponent {
  allOrders: any;
  orderDetails: any;
  displayedColumns: string[] = ['user', 'orderItems', 'orderStatus', 'totalPrice', 'paidAt', 'actions'];
  dataSource: any;

  constructor(private orderservice: OrderService, private dialog: MatDialog) {

    orderservice.getAllOrders().subscribe((res) => {
      res.forEach((e) => {
        let orderItems = e.orderItems
        orderItems.forEach((oi: any) => {
          let productName = oi.product.productName
          productName != undefined
        })
      }
      )
      this.dataSource = new MatTableDataSource(res)
    })
  }

  openAddOrder() {
    const dialogRef = this.dialog.open(AddOrderComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.orderservice.addOrder(result).subscribe(
          (res) => {
            this.dataSource.data.push(res);
            this.dataSource = new MatTableDataSource(this.dataSource.data)
          },
          (err) => { console.log("error", err) },
        )
      }
    })

  }

  openUpdateDialog(orderId: any) {
    const dialogRef = this.dialog.open(UpdateDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      // if (result !== undefined) {
      //   this.orderservice.getOrder(orderId).subscribe((res) => {
      //     res.orderStatus = result;
      //     this.orderDetails = res;
      //     console.log(this.orderDetails);
      //   })
      //   console.log(this.orderDetails);
      //   this.orderservice.updateOrder(orderId, this.orderDetails).subscribe(
      //     (res) => { console.log("res", res) },
      //     (err) => { console.log("error", err) },
      //   );
      // }
      console.log(result);

      if (result !== undefined) {
        this.orderservice.getAllOrders().subscribe((res) => {
          this.orderDetails = res.filter((item) => {
            if (item._id === orderId) {
              item.orderStatus = result
              return item
            }
          })
          console.log(orderId, this.orderDetails[0]);

          this.orderservice.updateOrder(orderId, this.orderDetails[0]).subscribe(
            () => {
              const index = this.dataSource.data.findIndex((item: any) => item._id === orderId);
              this.dataSource.data[index].orderStatus = result;
              this.dataSource = new MatTableDataSource(this.dataSource.data);

            }
          );
        });
      }
      else {
        console.error('Order not found:', orderId);
      }
    });
  };

  openDeleteDialog(orderId: number) {
    const dialogRef = this.dialog.open(DeleteDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.orderservice.deleteOrder(orderId).subscribe(
          () => {
            const index = this.dataSource.data.findIndex((item: any) => item._id === orderId);
            if (index !== -1) {
              this.dataSource.data.splice(index, 1);
              this.dataSource = new MatTableDataSource(this.dataSource.data);
            }
          },
        )
      } else {
        console.log('Delete cancelled');
      }
    });
  }
}