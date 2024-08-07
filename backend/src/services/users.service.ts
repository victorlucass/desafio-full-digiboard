import { ConflictException, Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateUserDto } from '../dtos/create-user.dto'
import { hash } from 'bcryptjs'
import { z } from 'zod'

export const createUserSchema = z
  .object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })
  .required()

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const users = await this.prisma.user.findMany()
    return users
  }

  async create(body: CreateUserDto) {
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

  async getUserById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    })

    if (!user) {
      throw new Error('Usuário não encontrado')
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    }
  }

  async update(id: string, body: CreateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    })

    if (!user) {
      throw new Error('Usuário não encontrado')
    }

    const { name, email, password } = body

    const hashedPassword = await hash(password, 8)

    await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        name,
        email,
        password: hashedPassword,
      },
    })
  }

  async delete(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    })

    if (!user) {
      throw new Error('Usuário não encontrado')
    }

    await this.prisma.payment.deleteMany({
      where: {
        userId: id,
      },
    })

    await this.prisma.user.delete({
      where: {
        id,
      },
    })
  }
}
