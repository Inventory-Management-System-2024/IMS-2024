import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { FormControl, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from '../../shared/services/register.service';




@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  public showPassword: boolean = false;
  public name!: string;
  public email!: string;
  public contact!: string;
  public password!: string;
  public confirmPassword!: string;
  constructor(private _registerService:RegisterService) { }

  registerUser(_name: string, _email: string, _cont: string, _passwd: string, _confPass: string) {
    this.name = _name;
    this.email = _email;
    this.contact = _cont;
    this.password = _passwd;
    this.confirmPassword = _confPass;
    if (_name != "" && _email != "" && _cont != "" && _passwd != "" && _confPass != "") {
      alert("Logged in SuccessFully");

    }
    else {
      alert("Please fill all the details");
    }
  }

  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNo: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
    password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,15}$')]),
    cpw: new FormControl('', [Validators.required, Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,15}$")])
  })
  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  postUser(user: any) {
    
    this._registerService.register(user).subscribe(res=>console.log(res));
    console.log(user);
  }

}
