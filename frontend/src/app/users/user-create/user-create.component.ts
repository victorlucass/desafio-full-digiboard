import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent {
  userForm: FormGroup;

  constructor(private fb: FormBuilder, private service: UsersService) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      githubUsername: ['']
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
     this.service.createUser(this.userForm.value).subscribe(() => {
       this.userForm.reset();
     })
    }
  }
}
