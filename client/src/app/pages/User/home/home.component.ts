import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../shared/services';
import { NavbarComponent } from "../../../components/navbar/navbar.component";
import { FooterComponent } from "../../../components/footer/footer.component";
import { UserNavbarComponent } from "../user-navbar/user-navbar.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [CommonModule, NavbarComponent, FooterComponent, UserNavbarComponent]
})
export class HomeComponent implements OnInit {
 
  constructor(private prodListService: ProductService) {}
  
  products: any;
  errorMessage: any;
  searchTimeout: NodeJS.Timeout | undefined;
  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.prodListService.getAllProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.products.reverse();
      },
      error: (error) => {
        this.errorMessage = error;
        console.warn(error);
      },
    });
  }

  productSearch(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;

    clearTimeout(this.searchTimeout);

    // Set a new timeout to trigger the API call after 1000ms (1 second)
    this.searchTimeout = setTimeout(() => {
      this.prodListService.getProduct(inputValue).subscribe({
        next: (data) => {
          this.products = data;
        },
        error: (err) => {
          this.products = [];

          console.log('error from  list', err);
        },
      });
    }, 1000);
  }
}
