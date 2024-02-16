import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ProductService } from '../../../shared/services';
import { NavbarComponent } from "../../../components/navbar/navbar.component";
import { FooterComponent } from "../../../components/footer/footer.component";
import { UserNavbarComponent } from "../user-navbar/user-navbar.component";
import { AppState } from '../../../states/app.state';
import { addToCart } from '../../../states/cart/cart.action';
import Product from '../../../shared/interfaces/product';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [CommonModule, NavbarComponent, FooterComponent, UserNavbarComponent,RouterLink]
})
export class HomeComponent implements OnInit {
 
  constructor(private prodListService: ProductService,private store : Store<AppState>) {}
  toast = inject(ToastrService);

  
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
  addToCart(product:Product){
    const productWithQuantity = { ...product, quantity: 1 };
    this.store.dispatch(addToCart({product: productWithQuantity}))
    this.toast.success("Item Added to Cart")
    this.gotocart(product)
  }
  gotocart(product: Product) {
    const dataFromLocalStorage = localStorage.getItem('cart') as string;
    const storage = JSON.parse(dataFromLocalStorage);

    if (storage && Array.isArray(storage)) {
        const productExists = storage.some((item: Product) => item._id === product._id);
        if (productExists) {
            console.log('Product exists in local storage');
            return true;
        } else {
            console.log('Product does not exist in local storage');
            return false;
        }
    } else {
        console.log('No data found in local storage');
        return false;
    }
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
