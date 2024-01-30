import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormsModule } from '@angular/forms';
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
  public name!: string;
  public email!: string;
  public contact!: string;
  public password!: string;
  public confirmPassword!: string;
  constructor(
    private route: Router,
    private _registerService: RegisterService
  ) { }

  registerUser(
    _name: string,
    _email: string,
    _phone: string,
    _passwd: string,
    _confPass: string
  ) {
    this.name = _name;
    this.email = _email;
    this.contact = _phone;
    this.password = _passwd;
    this.confirmPassword = _confPass;
    if (
      _name != '' &&
      _email != '' &&
      _phone != '' &&
      _passwd != '' &&
      _confPass != ''
    ) {
      alert('User Registered SuccessFully!');
      this.route.navigate(['']);
    } else {
      alert('Please fill all the details');
    }
  }

  login() {
    this.route.navigate(['']);
  }

  registerForm = new FormGroup(
    {
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
    },
    {
      validators: this.passwordMatchValidator,
    }
  );
  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  passwordMatchValidator(control: AbstractControl) {
    return control.get('password')?.value === control.get('cpw')?.value
      ? null
      : { misMatch: true };
  }

  postUser(user: any) {
    this._registerService.register(user).subscribe((res) => console.log(res));
    console.log(user);
  }
}
