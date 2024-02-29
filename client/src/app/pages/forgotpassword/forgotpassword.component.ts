import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { RegisterService } from '../../shared/services';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-forgotpassword',
  standalone: true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule,RouterLink],
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.css'
})
export class ForgotpasswordComponent {
  public showPassword!: boolean;
  public showConfirmPassword!: boolean;
  constructor(private route: Router,private _forgot:RegisterService) { }
  toast = inject(ToastrService);

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
    email:new FormControl('',Validators.email)
  });

  passwordMatchVAlidator(control: AbstractControl) {
    return control.get('password')?.value === control.get('confirmPassword')?.value ? null : { misMatch: true };
  }
  Reset(val:any){
    this._forgot.forgot(val).subscribe(res=>{console.log(res)
      this.toast.info(res.message)
    })
  }
}
