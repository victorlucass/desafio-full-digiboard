import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email: string = 'victorlucas@admin.com';
  password: string = '123456';

  constructor(private authService: AuthService, private router: Router) {
   
  }

  login() {
    this.authService.login(this.email, this.password).subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
