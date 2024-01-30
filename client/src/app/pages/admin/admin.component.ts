import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { UsersService } from '../../shared/services/users.service';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [NavbarComponent,CommonModule,AsyncPipe],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  users:any[]=[];
  errMsg!:string;
  constructor(private _UserService: UsersService){}

  ngOnInit():void {
    this._UserService.getAllUsers().subscribe({
      next:(data:any)=>{this.users=data;console.log(data)},
      error:(err)=>{this.errMsg=err}});
  }

  deleteUser(id:number){
    this._UserService.deleteUser(id).subscribe((res)=>console.log(res));
    const index = this.users.findIndex(user => user._id === id);
    if (index !== -1) {
      this.users.splice(index, 1);
    }
  }

}
