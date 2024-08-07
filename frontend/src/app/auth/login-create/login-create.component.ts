import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UsersService } from 'src/app/users/users.service';

@Component({
  selector: 'app-login-create',
  templateUrl: './login-create.component.html',
  styleUrls: ['./login-create.component.scss']
})
export class LoginCreateComponent {
  form: FormGroup;
  hidePassword = true;

  constructor(
    private userService: UsersService,
    private fb: FormBuilder,
    private router: Router,
    private messageService: MessageService
  ) {
    this.form = this.createForm();
  }

  // Método para criar o formulário
  private createForm(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  // Método para criar o usuário
  createUser(): void {
    if (this.form.valid) {
      this.userService.createUser(this.form.value).subscribe(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Conta criada com sucesso!'
        });
        this.router.navigate(['/login']);
      });
    } else {
      this.form.markAllAsTouched();
    }
  }

  // Método para validar se o formulário está preenchido
  isFormInvalid(): boolean {
    return this.form.invalid;
  }

  // Método para alternar a visibilidade da senha
  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }
}
