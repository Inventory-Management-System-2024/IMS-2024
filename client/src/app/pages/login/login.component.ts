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
  public showPassword: boolean = false;
  constructor(private route: Router,private _RegisterService:RegisterService) { }
  toast = inject(ToastrService);
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
    
  });
  signUp() {
    this.route.navigate(['register']);
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  get pass() {
    return this.loginForm.get('password');
  }
  get user() {
    return this.loginForm.get('email');
  }
  getUser(data: any) {
    this._RegisterService.login(data).subscribe((response)=>{
      console.log(response.body.token);
      const token=sessionStorage.getItem('token');
      sessionStorage.setItem('token', JSON.stringify(response.body.token))
      if(token=="undefined"){
        this.toast.error("Don't have an account! You need to Sign Up first!!")
        console.log("not valid");
      }
      else{
        this.toast.success("Login SuccessFul!", "Success");
        this.route.navigate(['dashboard']);
        
      }      
    }
    )
    // console.log(data);
  }
  
 
}
