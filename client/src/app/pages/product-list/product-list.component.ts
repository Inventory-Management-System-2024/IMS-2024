import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField, MatInput, MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { ProductService } from '../../shared/services';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SharedDataService } from '../../shared/services/shared-data.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, MatIconModule, FormsModule, MatTableModule, MatButtonModule, MatInputModule, MatFormField, MatInput, CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent {
  constructor(private router: Router,private productService: ProductService,private sharedDataService: SharedDataService) { 
  }
  displayedColumns: string[] = ['productName', 'image', 'category', 'description', 'price', 'stock', 'action'];
  dataSource: any[] = [];
  currentProduct: any;

  ngOnInit(): void {
    this.loadProducts();
  }
  loadProducts(): void {
    this.productService.getAllProducts().subscribe((data) => {
      this.dataSource = data;
    });
  }
 
  updateRecord(id: number) {
    // Get the product
    this.currentProduct = this.dataSource.find((product) => {
      return product._id == id;
    });
    // sending data to the add-product Component for Update data through service 
    console.log("inside productlist")

    this. sharedDataService.sendData(this.currentProduct);
    
    this.router.navigate(['/add_product'],{ queryParams: {edit : true}});

   
  }


  deleteRecord(id: number) {
    this.productService.deleteProduct(id).subscribe(() => {
      console.log('delete');
    });
    this.dataSource = this.dataSource.filter((product) => product._id !== id);
  }
  
}
