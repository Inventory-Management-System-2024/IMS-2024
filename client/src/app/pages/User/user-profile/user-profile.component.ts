import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import User from '../../../shared/interfaces/user';
import { SharedDataService, UsersService } from '../../../shared/services';
import { UserNavbarComponent } from "../user-navbar/user-navbar.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, UserNavbarComponent,RouterLink]
})
export class UserProfileComponent implements OnInit {

  user: any = {
    name: '',
    email: '',
    password: '',
    role: 'user',
    address: {
      address_line_1: '',
      city: '',
      state: '',
      country: '',
      pinCode: 0
    },
    phoneNo: ''
  };
  errMsg!: string;
  isEditing: boolean = false;
  userId : any = sessionStorage.getItem('id');

  constructor(private _userService: UsersService, private _shared: SharedDataService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this._userService.getUser(this.userId).subscribe({
      next: (data: any) => {
        this.user.name = data.name;
        this.user.email = data.email;
        this.user.phoneNo = data.phoneNo
        if (data.hasOwnProperty('address')) {
          this.user.address = data.address;
        }
      },
      error: (err) => {
        this.errMsg = err;
      },
    })
  }
  toggleEdit() {
    this.isEditing = !this.isEditing;
  }
  closeEdit() {
    this.isEditing = !this.isEditing;
}

  saveChanges(userrr: any) {
    console.log(userrr);
    if (this.user) {
      const userWithoutPassword = { ...this.user };
      delete userWithoutPassword.password;
      this._userService.updateUser(this.userId, userWithoutPassword).subscribe((res) => {
        console.log(res);
        this.isEditing = false;
      });
    }
  }
}