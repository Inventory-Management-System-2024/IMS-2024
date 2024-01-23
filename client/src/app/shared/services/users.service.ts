import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../../Interface/user.model';
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor() { }

  private users: User[] = [

    { id: 1, name: 'User 1' },
    { id: 2, name: 'User 2' },
    { id: 3, name: 'User 3' },
    { id: 4, name: 'User 4' },
    { id: 5, name: 'User 5' },
    // Add more users or fetch them from an API
  ];
  getRecentUsers(): Observable<User[]> {
    // Return the 5 recent users
    const recentUsers = this.users.slice(0, 5);
    return of(recentUsers);
  }
}