import { Body, ConflictException, Controller, Get, Post } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { hash } from 'bcryptjs'

@Controller('/users')
export class CreateUserController {
  constructor(private prisma: PrismaService) {}

  @Post()
  async handler(@Body() body) {
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
