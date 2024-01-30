import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  FormControl,
  Validators,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from '../../shared/services/register.service';




@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  public showPassword: boolean = false;
  errMsg!:string
  constructor(private route: Router,private _registerService:RegisterService) { }

  login() {
    this.route.navigate(['']);
  }

  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNo: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,15}$'),
    ]),
    cpw: new FormControl('', [
      Validators.required,
      Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,15}$'),
    ]),
  });
  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  postUser(user: any) {
    
    this._registerService.register(user).subscribe({
      next:(res)=>console.log(res),
      error:(err)=>this.errMsg=err
    });
    console.log(user);
  }

  

}
