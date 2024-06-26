import { Body, Controller, Post, UsePipes } from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation'
import { CreateUserDto } from 'src/dtos/create-user.dto'
import { UsersService } from 'src/services/users.service'

const createUserSchema = z
  .object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })
  .required()

@Controller('/users')
@UsePipes(new ZodValidationPipe(createUserSchema))
export class CreateUserController {
  constructor(private service: UsersService) {}

  @Post()
  async create(@Body() body: CreateUserDto) {
    await this.service.create(body)
  }
}
