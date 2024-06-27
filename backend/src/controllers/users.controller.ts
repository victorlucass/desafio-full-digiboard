import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common'

import { CreateUserDto } from 'src/dtos/create-user.dto'
import { UsersService, createUserSchema } from 'src/services/users.service'
import { ApiTags, ApiOperation } from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { ZodValidationPipe } from 'src/pipes/zod-validation'

@ApiTags('users')
@Controller('/users')
export class CreateUserController {
  constructor(private service: UsersService) {}

  @ApiOperation({ summary: 'Create user' })
  @Post()
  @UsePipes(new ZodValidationPipe(createUserSchema))
  async create(@Body() body: CreateUserDto) {
    console.log(body)
    await this.service.create(body)
  }

  @ApiOperation({ summary: 'Get user by id' })
  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  async getUserById(@Param('id') id: string) {
    return await this.service.getUserById(id)
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update user' })
  @Post('/:id')
  @UsePipes(new ZodValidationPipe(createUserSchema))
  async update(@Param('id') id: string, @Body() body: CreateUserDto) {
    await this.service.update(id, body)
  }
}
