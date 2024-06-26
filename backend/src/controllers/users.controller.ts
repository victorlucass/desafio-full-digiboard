import { Body, Controller, Post } from '@nestjs/common'

import { CreateUserDto } from 'src/dtos/create-user.dto'
import { UsersService } from 'src/services/users.service'

@Controller('/users')
export class CreateUserController {
  constructor(private service: UsersService) {}

  @Post()
  async create(@Body() body: CreateUserDto) {
    await this.service.create(body)
  }
}
