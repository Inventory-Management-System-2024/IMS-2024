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
  public email: string = "";
  public password: string = "";
  constructor(private route: Router) { }
  getUser(_email: string, _password: string) {
    this.email = _email;
    this.password = _password;
    // if (_email == "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$" && _password == "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$") {
    // console.warn(_password);

    console.log("Logged in Successfully");
    this.route.navigate(['home']);
    // } else {
    //   alert("Invalid Credentials");
    // }
  }
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,10}$")])
  });


  get pass() {
    // console.warn();

    return this.loginForm.get('password');
  }
  get user() {
    return this.loginForm.get('email');
  }
}
