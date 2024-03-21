import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { RegisterService } from '../../shared/services';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,RouterLink],
  templateUrl: "reset-password.component.html",
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {
  public showPassword!: boolean;
  public showConfirmPassword!: boolean;
  constructor(private route: Router,private _reset:RegisterService,private routes:ActivatedRoute) { }
  login() {
    this.route.navigate(['']);
  }


  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }
  toggleConfirmPassword(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  resetPasswordForm = new FormGroup({
    password: new FormControl('', [
      Validators.required,
      Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,15}$'),
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
      Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,15}$'),
    ]),
  }, {
    validators: this.passwordMatchVAlidator,
  });

  passwordMatchVAlidator(control: AbstractControl) {
    return control.get('password')?.value === control.get('confirmPassword')?.value ? null : { misMatch: true };
  }
  reset(password:string){
    this._reset.reset(password,this.routes.snapshot.paramMap.get('id')).subscribe(res=>console.log(res))
  }
}
