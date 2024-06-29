import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../user.model';
import { UsersService } from '../users.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  userLocalStorage: User = JSON.parse(localStorage.getItem('user')!);


  constructor(
    private route: ActivatedRoute,
    private userService: UsersService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  // Método para carregar os usuários a partir dos dados da rota
  private loadUsers(): void {
    this.route.data.subscribe((data: any) => {
      this.users = data.users;
    });
  }

  // Método para deletar um usuário
  deleteUser(user: User): void {
    this.userService.deleteUser(user.id).subscribe(() => {
      this.users = this.users.filter(u => u.id !== user.id);
      this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Usuário deletado!' });
    });
  }

 verifyUser(user: User): boolean {
   return user.id === this.userLocalStorage.id
 }
}
