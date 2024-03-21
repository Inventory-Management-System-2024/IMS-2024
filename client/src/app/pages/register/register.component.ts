import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';

import {
  FormsModule, AbstractControl,
  FormControl,
  Validators,
  FormGroup,
  ReactiveFormsModule
} from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from '../../shared/services/register.service';
import User from '../../shared/interfaces/user';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  public showPassword: boolean = false;
  public showConfirmPassword!: boolean;
  toast = inject(ToastrService);
  errMsg!: string
  constructor(private route: Router, private _registerService: RegisterService) { }

  login() {
    this.route.navigate(['login']);
  }

  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z]+.{2,50}$')]),
    email: new FormControl('', [Validators.required,Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]),
    phoneNo: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
      Validators.pattern('^[0-9]+$')
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/),
    ]),
    cpw: new FormControl('', [
      Validators.required, Validators.pattern(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/),
    ]),
  }, {
    validators: this.passwordMatchVAlidator
  });

  get name() {
    return this.registerForm.get('name');
  }
  get email() {
    return this.registerForm.get('email');
  }
  get phoneNo() {
    return this.registerForm.get('phoneNo');
  }
  get password() {
    return this.registerForm.get('password');
  }
  passwordMatchVAlidator(control: AbstractControl) {
    return control.get('password')?.value === control.get('cpw')?.value ? null : { misMatch: true };
  }
  togglePassword() {
    this.showPassword = !this.showPassword;
  }
  toggleConfirmPassword(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
  postUser(user: User) {

    this._registerService.register(user).subscribe({
      next: (res) => {
        console.log(res.error);
        if (res.error)
          this.toast.warning(res.error);
        else {
          this.toast.success("Registered successfully");
        }
      this.login();
      },
      error: (err) => { this.errMsg = err }
    });

    console.log(user);
  }
}
