import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ProductService } from '../../../shared/services';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

interface OrderItem {
  quantity: number,
  product: any,
  id:number
}

@Component({
  selector: 'app-add-order',
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatLabel, MatFormField, FormsModule, CommonModule, MatIconModule],
  templateUrl: './add-order.component.html',
  styleUrl: './add-order.component.css'
})
export class AddOrderComponent {
  productlist: any
  selectedOrderStatus!: string
  // selectedProduct!: any
  selectedDate: any = Date.now();
  option!: any
  // product_data!: any
  orderItems: OrderItem[] = [{ quantity: 1, product: {},id:1 }]

  constructor(private ps: ProductService, public dialogRef: MatDialogRef<AddOrderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.ps.getAllProducts().subscribe(
      {next:(data: any) => {
        this.productlist = data; 
      },
      error:(error: any) => {
        console.error('Error fetching products:', error);
      }}
    );
    
  }
  

  
  onNoClick(): void {
    this.dialogRef.close();
  }
  stock!:number;
  onYesClick(): void {
    let totalPrice = 0;
    
    for (const item of this.orderItems) {
      
      if (item.quantity !== null && item.product && item.product.price) {
        totalPrice += item.quantity * item.product.price;
      }
    }
    this.option = {
      orderItems: this.orderItems,
      orderStatus: this.selectedOrderStatus,
      totalPrice: totalPrice,
      paidAt: this.selectedDate,
    };
    this.dialogRef.close(this.option);
  }
  isInvalidQuantity(): boolean {
    const decimalRegex = /^[1-9]\d*$/;
    return this.orderItems.some(ele => {
      return (
        ele.quantity === null ||
        (ele.quantity <= 0 ||
        ele.quantity>=this.stock)||
        !decimalRegex.test(ele.quantity.toString()) ||
        this.selectedOrderStatus === null ||
        this.selectedOrderStatus === undefined
      );
    });
  }
  isAnyProductNotSelected(): boolean {
    return this.orderItems.some(ele => !ele.product || !ele.product.productName);
  }
  addProduct(): void {
    const newId = this.orderItems.length + 1;
    this.orderItems.push({ id: newId, quantity: 1, product: {} })
  }
  removeProduct(itemId: number): void {
    const index = this.orderItems.findIndex(item => item.id === itemId);
    if(this.orderItems.length>1){
      if (index !== -1) {
        this.orderItems.splice(index, 1);
      }
    }
  }
}
