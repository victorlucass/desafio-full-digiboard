import {
  Body,
  ConflictException,
  Controller,
  Get,
  Post,
  UsePipes,
} from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { hash } from 'bcryptjs'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation'

const createUserSchema = z
  .object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })
  .required()

type CreateUserInput = z.infer<typeof createUserSchema>

@Controller('/users')
@UsePipes(new ZodValidationPipe(createUserSchema))
export class CreateUserController {
  constructor(private prisma: PrismaService) {}

  @Post()
  async handler(@Body() body: CreateUserInput) {
    const { name, email, password } = body

    const userWithSameEmail = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (userWithSameEmail) {
      throw new ConflictException('Esse email já existe')
    }

    const hashedPassword = await hash(password, 8)

    await this.prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    })
  }

  @Get()
  async getAll() {
    const users = await this.prisma.user.findMany()
    return users
  }
}
