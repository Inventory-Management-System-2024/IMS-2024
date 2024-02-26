import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
  FormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RegisterService } from '../../shared/services/register.service';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngrx/store';
import { AppState } from '../../states/app.state';
import { Observable } from 'rxjs';
import { selectCountProducts } from '../../states/cart/cart.selector';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  name!: string;
  public showPassword: boolean = false;
  errMsg!: string;
  productLength !: number;
  countProducts$: Observable<number> | undefined;
  constructor(private route: Router, private _RegisterService: RegisterService,private store : Store<AppState>) { 
    this.countProducts$=store.select(selectCountProducts)

    this.countProducts$.subscribe((count: number) => {
      this.productLength = count;
    });
    
    }
  toast = inject(ToastrService);
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
  signUp() {
    this.route.navigate(['register']);
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }
  resetPassword() {
    this.route.navigate(['resetPassword']);
  }

  get pass() {
    return this.loginForm.get('password');
  }
  get user() {
    return this.loginForm.get('email');
  }
  getUser(data: any) {
    this._RegisterService.login(data).subscribe(
      {
        next: (response) => {
          sessionStorage.setItem('token', response.body.token)
          const token = sessionStorage.getItem('token');
          if (token === "undefined") {
            this.toast.error("Please check your Email address and Password")
            console.log("not valid");
          }
          else {
          sessionStorage.setItem('id', response.body.user._id);
            localStorage.setItem('name', response.body.user.name);
            sessionStorage.setItem('role',response.body.user.role)
            sessionStorage.setItem('email', response.body.user.email)
            this.toast.success("Login SuccessFul!", "Success");
            if(this.productLength > 0)
            {
              this.route.navigate(['/cart']);
            }
            else
            this.route.navigate(['']);
          }
        },
        error: (err) => this.errMsg = err

      }
    )
  }
}
