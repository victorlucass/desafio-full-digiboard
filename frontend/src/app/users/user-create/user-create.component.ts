import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss'],
})
export class UserCreateComponent implements OnInit {
  userForm: FormGroup;
  title = 'Cadastrar Usuário';
  idUser: string | null = null;

  constructor(
    private fb: FormBuilder,
    private service: UsersService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService
  ) {
    this.userForm = this.createForm();
  }

  ngOnInit(): void {
    this.checkForUserId();
  }

  // Método para criar o formulário
  private createForm(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      githubUsername: [''],
    });
  }

  // Método para verificar se há um ID de usuário na rota
  private checkForUserId(): void {
    this.route.params.subscribe((params) => {
      this.idUser = params['id'];
      if (this.idUser) {
        this.loadUser();
      }
    });
  }

  // Método para carregar os dados do usuário
  private loadUser(): void {
    this.title = 'Atualizar Usuário';
    this.service.getUserById(this.idUser!).subscribe(
      (user) => {
        this.userForm.patchValue(user);
      },
      (_error) => {
        this.router.navigate(['/users']);
      }
    );
  }

  // Método para submissão do formulário
  onSubmit(): void {
    if (this.userForm.valid) {
      if (this.idUser) {
        this.updateUser();
      } else {
        this.createUser();
      }
    }
  }

  // Método para atualizar o usuário
  private updateUser(): void {
    this.service.updateUser(this.idUser!, this.userForm.value).subscribe(() => {
      this.showMessage('success', 'Sucesso', 'Usuário atualizado com sucesso!');
      this.router.navigate(['/users']);
    });
  }

  // Método para criar o usuário
  private createUser(): void {
    this.service.createUser(this.userForm.value).subscribe(
      () => {
        this.showMessage('success', 'Sucesso', 'Usuário criado com sucesso!');
        this.router.navigate(['/users']);
      },
      (_error) => {
        const { error } = _error;
        this.showMessage('error', 'Erro', error.message);
      }
    );
  }

  // Método para exibir mensagem
  private showMessage(severity: string, summary: string, detail: string): void {
    this.messageService.add({
      severity: severity,
      summary: summary,
      detail: detail,
    });
  }
}
