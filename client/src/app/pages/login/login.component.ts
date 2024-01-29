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
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  public showPassword: boolean = false;
  toast = inject(ToastrService);
  constructor(private route: Router) { }
  getUser(_email: string, _password: string) {
    if (_email != '' && _password != '') {
      this.toast.success("Login SuccessFul!", "Success");
      this.route.navigate(['dashboard']);
    } 
    
  }
  signUp() {
    this.route.navigate(['register']);
  }
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,15}$'),
    ]),
  });

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  get pass() {
    return this.loginForm.get('password');
  }
  get user() {
    return this.loginForm.get('email');
  }
}
