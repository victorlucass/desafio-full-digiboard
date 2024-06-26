import { Body, ConflictException, Controller, Get, Post } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'

@Controller('/users')
export class CreateUserController {
  constructor(private prisma: PrismaService) {}

  @Post()
  async handler(@Body() body) {
    const { email } = body

    const userWithSameEmail = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (userWithSameEmail) {
      throw new ConflictException('Esse email já existe')
    }

    await this.prisma.user.create({
      data: body,
    })
  }

  @Get()
  async getAll() {
    const users = await this.prisma.user.findMany()
    return users
  }
}
