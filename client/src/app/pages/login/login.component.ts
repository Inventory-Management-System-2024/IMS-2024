import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
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

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  name!: string;
  public showPassword: boolean = false;
  errMsg!: string;
  constructor(private route: Router, private _RegisterService: RegisterService) { }
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
          sessionStorage.setItem('id', response.body.user._id);
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
            this.route.navigate(['']);
          }
        },
        error: (err) => this.errMsg = err

      }
    )
  }
}
