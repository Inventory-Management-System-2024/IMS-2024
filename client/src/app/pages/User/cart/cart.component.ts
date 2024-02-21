import { Component, inject } from '@angular/core';
import { UserNavbarComponent } from '../user-navbar/user-navbar.component';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import Product from '../../../shared/interfaces/product';
import { selectCartProducts, selectTotalPrice } from '../../../states/cart/cart.selector';
import { decrementProduct, incrementProduct, removeItem } from '../../../states/cart/cart.action';
import { AppState } from '../../../states/app.state';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [UserNavbarComponent,CommonModule,RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  constructor(private store: Store<AppState>) {
  }

  toast = inject(ToastrService);
  
  products$:Observable<Product[]> = this.store.select(selectCartProducts)
  totalprice$:Observable<number> = this.store.select(selectTotalPrice)

  incrementQuantity(productId: number): void {
    this.store.dispatch(incrementProduct({ productId }));
  }

  decrementQuantity(productId: number): void {
    this.store.dispatch(decrementProduct({ productId }));
  }

  removeFromCart(productId: number): void {
    this.store.dispatch(removeItem({ productId }));
    this.toast.success("Item removed from the cart!")
    
  }

  getTotalPrice(): Observable<number> {
    return this.totalprice$;
  }
}
