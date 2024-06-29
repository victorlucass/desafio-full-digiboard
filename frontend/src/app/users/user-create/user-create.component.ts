import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../users.service';
import { ActivatedRoute, Router } from '@angular/router';

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
    private router: Router
  ) {
    this.userForm = this.createForm();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.idUser = params['id'];
      if (this.idUser) {
        this.loadUser();
      }
    });
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

  // Método para carregar os dados do usuário
  private loadUser(): void {
    this.title = 'Atualizar Usuário';
    this.service.getUserById(this.idUser!).subscribe(user => {
      this.userForm.patchValue(user);
    });
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
      this.router.navigate(['/users']);
    });
  }

  // Método para criar o usuário
  private createUser(): void {
    this.service.createUser(this.userForm.value).subscribe(() => {
      this.userForm.reset();
    });
  }
}
