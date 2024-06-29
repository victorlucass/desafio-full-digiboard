import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/users/users.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  payload: any;

  constructor(
    private authService: AuthService,
    private userService: UsersService,
    private router: Router,
    private messageService: MessageService
  ) {}

  // Método para realizar o login
  login(): void {
    if (this.isFormInvalid()) {
      this.showErrorMessage('Erro', 'Preencha todos os campos.');
      return;
    }

    this.authService.login(this.email, this.password).subscribe(
      (data) => {
        this.handleSuccessfulLogin(data.access_token);
      },
      (error) => {
        this.handleLoginError(error);
      }
    );
  }

  // Método para validar se o formulário está preenchido
  isFormInvalid(): boolean {
    return this.email === '' || this.password === '';
  }

  // Método para lidar com login bem-sucedido
  private handleSuccessfulLogin(token: string): void {
    const payload = this.authService.readPayload(token);
    this.userService.getUserById(payload.sub).subscribe((user) => {
      localStorage.setItem('user', JSON.stringify(user));
      this.showSuccessMessage(`Bem-vindo ${user.name}`, 'Login efetuado com sucesso!');
      this.redirectToStore();
    });
  }

  // Método para lidar com erro de login
  private handleLoginError(error: any): void {
    const { message } = error.error;
    this.showErrorMessage('Erro', message);
  }

  // Método para exibir mensagem de sucesso
  private showSuccessMessage(summary: string, detail: string): void {
    this.messageService.add({
      severity: 'success',
      summary: summary,
      detail: detail,
    });
  }

  // Método para exibir mensagem de erro
  private showErrorMessage(summary: string, detail: string): void {
    this.messageService.add({
      severity: 'error',
      summary: summary,
      detail: detail,
    });
  }

  // Método para redirecionar para a página de loja
  private redirectToStore(): void {
    this.router.navigate(['/store']);
  }
}
