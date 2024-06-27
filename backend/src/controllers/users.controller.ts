import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
} from '@nestjs/common'

import { CreateUserDto } from 'src/dtos/create-user.dto'
import { UsersService, createUserSchema } from 'src/services/users.service'
import { ApiTags, ApiOperation } from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { ZodValidationPipe } from 'src/pipes/zod-validation'

const bodyValidationPipe = new ZodValidationPipe(createUserSchema)

@ApiTags('users')
@Controller('/users')
export class CreateUserController {
  constructor(private service: UsersService) {}

  @ApiOperation({ summary: 'Create user' })
  @UsePipes(new ZodValidationPipe(createUserSchema))
  @Post()
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
  @Put('/:id')
  async update(
    @Body(bodyValidationPipe) body: CreateUserDto,
    @Param('id') id: string,
  ) {
    await this.service.update(id, body)
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete user' })
  @Delete('/:id')
  async delete(@Param('id') id: string) {
    await this.service.delete(id)
  }
}
