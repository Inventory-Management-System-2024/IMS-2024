import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormControl, FormGroup, Validators, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  public showPassword: boolean = false;
  constructor(private route: Router) { }
  getUser(_email: string, _password: string) {
    console.log("Logged in Successfully");
    if (_email != "" && _password != "") {
      alert("Login SuccessFull");
      this.route.navigate(['dashboard']);
    } else {
      alert("Invalid Username or Password!")
    }

  }
  signUp() {
    this.route.navigate(['register']);
  }
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,10}$")])
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
