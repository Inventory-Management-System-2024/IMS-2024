import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild, inject } from '@angular/core';
import { ProductService, UsersService } from '../../../shared/services';
import { NavbarComponent } from "../../../components/navbar/navbar.component";
import { FooterComponent } from "../../../components/footer/footer.component";
import { UserNavbarComponent } from "../user-navbar/user-navbar.component";
import { AppState } from '../../../states/app.state';
import { addToCart } from '../../../states/cart/cart.action';
import Product from '../../../shared/interfaces/product';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { CheckoutComponent } from '../checkout/checkout.component';


@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [CommonModule, NavbarComponent, FooterComponent, UserNavbarComponent,RouterLink,CheckoutComponent]
})
export class HomeComponent implements OnInit {
  _user: any={};
 
  constructor(private prodListService: ProductService,private store : Store<AppState>,private _userService: UsersService) {}
  toast = inject(ToastrService);

  currentPage:number=1;
  itemPerPage:number=9;
  products: any;
  errorMessage: any;
  searchTimeout: NodeJS.Timeout | undefined;
  @ViewChild("childview") _navBar:UserNavbarComponent | undefined;
  ngOnInit(): void {
    this.loadProducts();
    this.loadUsers();
  }



  userId : any = sessionStorage.getItem('id');

  loadUsers(): void {
    this._userService.getUser(this.userId).subscribe({
      next: (data: any) => {
        this._user.name = data.name;
      },
    })
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
  get paginatedProducts() {
    const startIndex = (this.currentPage - 1) * this.itemPerPage;
    return this.products.slice(startIndex, startIndex + this.itemPerPage);
  }
  onPageChange(pageNumber: number) {
    this.currentPage = pageNumber;
  }
  pageCount!:number
  getPageNumbers(): number[] {
    this.pageCount = Math.ceil(this.products.length / this.itemPerPage);
    return Array(this.pageCount).fill(0).map((x, i) => i + 1);
  }
  nextPage(){
    if(this.currentPage==this.pageCount){
      this.currentPage--;
    }
    this.currentPage++;
  }
  previousPage(){
    if(this.currentPage==1){
      this.currentPage++;
    }
    this.currentPage--;
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
            return true;
        } else {
            return false;
        }
    } else {
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
          this.products.reverse();
        },
        error: (err) => {
          this.products = [];

          console.log('error from  list', err);
        },
      });
    }, 1000);
  }
}
