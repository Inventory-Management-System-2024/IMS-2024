import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField, MatInput, MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { ProductService, SharedDataService } from '../../shared/services';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { InventoryStatusPipe } from '../../pipes/inventory-status.pipe';
import { DeleteDialogComponent } from '../order/delete-dialog/delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [NavbarComponent, InventoryStatusPipe, FooterComponent, MatIconModule, FormsModule, MatTableModule, MatButtonModule, MatInputModule, MatFormField, MatInput, CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent {
  constructor(private router: Router, private productService: ProductService, private sharedDataService: SharedDataService,private dialog: MatDialog) {
  }
  displayedColumns: string[] = ['productName', 'image', 'description', 'price', 'stock', 'action'];
  dataSource: any[] = [];
  currentProduct: any;
  errorMessage: any;
  searchTerm?: string;
  searchTimeout: NodeJS.Timeout | undefined;


  ngOnInit(): void {
    this.loadProducts();
  }
  loadProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.dataSource = data;
        this.dataSource.reverse();
      },
      error: (error) => {
        this.errorMessage = error;
        console.warn(error);
      }
    });
  }

  updateRecord(id: number) {
    // Get the product
    this.currentProduct = this.dataSource.find((product) => {
      return product._id == id;
    });
    // sending data to the add-product Component for Update data through service
    console.log("inside productlist")

    this.sharedDataService.sendData(this.currentProduct);

    this.router.navigate(['/add_product/edit']);
  }
  deleteRecord(id: number) {
    const dialogRef = this.dialog.open(DeleteDialogComponent);
    // this.productService.deleteProduct(id).subscribe(() => {
    //   console.log('delete');
    // });
    

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.productService.deleteProduct(id).subscribe(
          () => {
            this.dataSource = this.dataSource.filter((product) => product._id !== id);
            },
        )
      } else {
        console.log('Delete cancelled');
      }
    });

  }

  productSearch(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;

    clearTimeout(this.searchTimeout);

    // Set a new timeout to trigger the API call after 1000ms (1 second)
    this.searchTimeout = setTimeout(() => {
      this.productService.getProduct(inputValue).subscribe({
        next: (data) => {
          this.dataSource = data;
        },
        error: (err) => {
          this.dataSource = [];

          console.log('error from  list', err);
        },
      });
    }, 1000);
  }
}
