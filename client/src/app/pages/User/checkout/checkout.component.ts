import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DropdownService } from '../../../shared/services/dropdown.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { UserNavbarComponent } from '../user-navbar/user-navbar.component';
import { OrderService } from '../../../shared/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, RouterLink, UserNavbarComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {
  countries: any[] = [];
  states: any[] = [];
  cities: any[] = [];
  scountries: any[] = [];
  sstates: any[] = [];
  scities: any[] = [];

  constructor(private router: Router, private orderService: OrderService, private checkoutService: DropdownService) { }
  checkoutForm = new FormGroup({
    firstname: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z]*$'),
    ]),
    phoneNum: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
      Validators.pattern('^[0-9]+$'),
    ]),
    email: new FormControl('', [Validators.required, Validators.pattern("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}"), Validators.email]),
    billingAddress: new FormControl('', [Validators.required]),
    shippingAddress: new FormControl('', [Validators.required]),
    selectedCountry: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    postcode: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]*$'),
      Validators.maxLength(6),
      Validators.minLength(6),
    ]),
    selectedsCountry: new FormControl('', [Validators.required]),
    sstate: new FormControl('', [Validators.required]),
    scity: new FormControl('', [Validators.required]),
    spostcode: new FormControl('', [
      Validators.required,
      Validators.maxLength(10),
      Validators.pattern('^[0-9]+$'),
    ]),
    sameAsBilling: new FormControl(false),
  });

  onSubmit() {
    let result = {};
    const cartData: any = localStorage.getItem('cart');
    if (cartData === null) {
      console.error('No data found in localStorage for key "cart"');
    } else {
      const cartItems = JSON.parse(cartData);

      if (!Array.isArray(cartItems)) {
        console.error('Invalid format for orderItems in localStorage');
      } else {
        const totalPrice = cartItems.reduce((acc, product) => acc + (product.price * product.quantity), 0);
        const orderItems = cartItems.map((item: any) => (
          {
            product: item,
            quantity: item.quantity,
          }
        ));
        result = {
          orderItems: orderItems,
          orderStatus: "Processing",
          totalPrice: totalPrice,
          paidAt: Date.now()
        };
      }
    }
    if (this.checkoutForm.valid) {
      this.orderService.addOrder(result).subscribe(() => {
        localStorage.removeItem('cart');
        this.router.navigate(['/']);
      })
    }
  }

  copyBillingToShipping(event: any) {
    if (event.target.checked) {
      this.checkoutForm.controls.shippingAddress.setValue(this.checkoutForm.controls.billingAddress.value);
      this.checkoutForm.controls.selectedsCountry.setValue(this.checkoutForm.controls.selectedCountry.value);
      this.checkoutForm.controls.sstate.setValue(this.checkoutForm.controls.state.value);
      this.checkoutForm.controls.scity.setValue(this.checkoutForm.controls.state.value);
      this.checkoutForm.controls.scity.setValue(this.checkoutForm.controls.city.value);
      this.checkoutForm.controls.spostcode.setValue(this.checkoutForm.controls.postcode.value);

      this.selectedsCountry?.disable();
      this.sstate?.disable();
      this.scity?.disable();
      this.spostcode?.disable();
    } else {
      this.checkoutForm.controls.shippingAddress.reset();
      this.checkoutForm.controls.selectedsCountry.reset();
      this.checkoutForm.controls.sstate.reset();
      this.checkoutForm.controls.scity.reset();
      this.checkoutForm.controls.spostcode.reset();

    }
  }
  get fname() {
    return this.checkoutForm.get('firstname');
  }
  get phoneNum() {
    return this.checkoutForm.get('phoneNum');
  }
  get email() {
    return this.checkoutForm.get('email');
  }
  get selectedCountry() {
    return this.checkoutForm.get('selectedCountry');
  }
  get state() {
    return this.checkoutForm.get('state');
  }
  get city() {
    return this.checkoutForm.get('city');
  }
  get postcode() {
    return this.checkoutForm.get('postcode')!;
  }
  get selectedsCountry() {
    return this.checkoutForm.get('selectedsCountry');
  }
  get sstate() {
    return this.checkoutForm.get('sstate');
  }
  get scity() {
    return this.checkoutForm.get('scity');
  }
  get spostcode() {
    return this.checkoutForm.get('spostcode');
  }
  ngOnInit(): void {
    this.loadCountries();
  }
  loadCountries(): void {
    this.checkoutService.getCountries().subscribe({
      next: (res: any) => {
        this.countries = [];
        this.scountries = [];
        res.data.forEach((obj: any) => {
          if (obj.hasOwnProperty('country') && obj.hasOwnProperty('iso2')) {
            this.countries.push({ name: obj.country, id: obj.iso2 });
          } else {
            console.log('Error');
          }
        });
      }
    });
  }
  OnCountryChange() {
    const cnt = this.selectedCountry?.value;
    if (cnt) {
      const selectedCountryId = this.getCountryId(cnt);
      console.log(selectedCountryId);
      this.checkoutService.getStateByCountry(selectedCountryId).subscribe({
        next: (res: any) => {
          this.states = [];
          res.forEach((obj: any) => {
            if (obj.hasOwnProperty('iso2')) {
              this.states.push({ name: obj.name, id: obj.iso2 });
            }
          })
        }
      });
    } else {
      this.states = [];
    }
  }
  onCountrysChange() {
    const scnt = this.selectedsCountry?.value;
    if (scnt) {
      const selectedsCountryId = this.getCountryId(scnt);
      this.checkoutService.getStateByCountry(selectedsCountryId).subscribe({
        next: (res: any) => {
          this.sstates = [];
          res.forEach((obj: any) => {
            if (obj.hasOwnProperty('iso2')) {
              this.sstates.push({ name: obj.name, id: obj.iso2 });
            }
          })
        }
      })
    } else {
      this.sstates = [];
    }
  }
  getCountryId(cnt: string) {
    const country = this.countries.find(c => c.name === cnt);
    return country ? country.id : null;
  }

  onStateChange() {
    const st = this.state?.value;
    const cntVal = this.selectedCountry?.value;

    if (cntVal && st) {
      const state_code = this.getStateCode(st);
      const country_code = this.getCountryId(cntVal);
      console.log(state_code);
      console.log(country_code);

      this.checkoutService.getCityByState(country_code, state_code).subscribe({
        next: (res: any) => {
          this.cities = [];
          res.forEach((obj: any) => {
            if (obj.hasOwnProperty('name')) {
              this.cities.push(obj.name);
            }
          })
        }
      })
    }
  }
  onsStateChange() {
    const scntVal = this.selectedsCountry?.value;
    const sst = this.sstate?.value;
    if (scntVal && sst) {
      const sstate_code = this.getsStateCode(sst);
      const scountry_code = this.getCountryId(scntVal);

      this.checkoutService.getCityByState(scountry_code, sstate_code).subscribe({
        next: (res: any) => {
          this.cities = [];
          res.forEach((obj: any) => {
            if (obj.hasOwnProperty('name')) {
              this.scities.push(obj.name);
            }
          })
        }
      })
    }
  }

  getStateCode(st_code: String) {
    const state = this.states.find(s => s.name === st_code);
    return state ? state.id : null;
  }
  getsStateCode(st_code: String) {
    const state = this.sstates.find(s => s.name === st_code);
    return state ? state.id : null;
  }
}