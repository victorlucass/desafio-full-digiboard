import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersService } from './users.service';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserResolver implements Resolve<User[]> {
  constructor(private usersService: UsersService) {}

  resolve(): Observable<User[]> {
    return this.usersService.getUsers();
  }
}
