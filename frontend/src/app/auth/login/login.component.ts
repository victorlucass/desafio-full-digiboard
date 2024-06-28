import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { UsersService } from 'src/app/users/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  payload: any;
  
  constructor(private authService: AuthService, private router: Router, private user: UsersService) {
  }

  login() {
    this.authService.login(this.email, this.password).subscribe(() => {
      // this.router.navigate(['/']);
      // this.payload = this.authService.getPayload();
      // this.user.getUserById(this.payload.sub).subscribe((user) => {
      //   localStorage.setItem('user', JSON.stringify(user));
      // });
    });
  }
}
