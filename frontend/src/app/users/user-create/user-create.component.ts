import { Component } from '@angular/core';
import { UsersService } from '../users.service';
import { User } from '../user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent {
  user: User = {
    name: '',
    password: '',
    githubUsername: '',
    email: ''
  };

  constructor(private usersService: UsersService, private router: Router) {}

  createUser() {
    this.usersService.createUser(this.user).subscribe(() => {
      this.router.navigate(['/users']);
    });
  }
}
