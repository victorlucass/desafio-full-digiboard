import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/users/users.service';

@Component({
  selector: 'app-login-create',
  templateUrl: './login-create.component.html',
  styleUrls: ['./login-create.component.scss']
})
export class LoginCreateComponent {
  form: FormGroup;

  constructor(
    private userService: UsersService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.form = this.createForm();
  }

  // Método para criar o formulário
  private createForm(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      githubUsername: ['', Validators.required]
    });
  }

  // Método para criar o usuário
  createUser(): void {
    if (this.form.valid) {
      this.userService.createUser(this.form.value).subscribe(() => {
        this.router.navigate(['/login']);
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
}
