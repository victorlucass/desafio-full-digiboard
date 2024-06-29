import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../user.model';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: User[] = [];

  constructor(
    private route: ActivatedRoute,
    private userService: UsersService
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
    });
  }
}
