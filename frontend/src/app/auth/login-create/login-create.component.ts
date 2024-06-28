import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/users/users.service';

@Component({
  selector: 'app-login-create',
  templateUrl: './login-create.component.html',
  styleUrls: ['./login-create.component.scss']
})
export class LoginCreateComponent  {

  form: FormGroup;

  constructor(private user: UsersService, private fb: FormBuilder, private route: Router) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      githubUsername: ['', Validators.required]
    })
   }

  createUser() {
    this.user.createUser(this.form.value).subscribe(() => {
      this.route.navigate(['/login']);
    })
  }


}
