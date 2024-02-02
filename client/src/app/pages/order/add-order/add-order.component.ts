import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ProductService } from '../../../shared/services';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-order',
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatLabel, MatFormField, FormsModule, CommonModule],
  templateUrl: './add-order.component.html',
  styleUrl: './add-order.component.css'
})
export class AddOrderComponent {
  productlist: any
  selectedOrderStatus!: string
  selectedProduct!: any
  numberOfItems!: number;
  selectedDate: any = Date.now();
  option!: any
  product_data!: any

  constructor(private ps: ProductService, public dialogRef: MatDialogRef<AddOrderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.ps.getAllProducts().subscribe(
      (data: any) => {
        this.productlist = data;
      },
      (error: any) => {
        console.error('Error fetching products:', error);
      }
    );
  }
  setProductData(e: any) {
    console.log(e)
    this.product_data = e
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick(): void {
    this.option = {
      orderItems: [
        {
          quantity: this.numberOfItems,
          product: this.selectedProduct._id,
        }
      ],
      orderStatus: this.selectedOrderStatus,
      totalPrice: this.numberOfItems * this.selectedProduct.price,
      paidAt: this.selectedDate,
    };
    this.dialogRef.close(this.option);
  }
}
