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
    githubUsername: z.string(),
  })
  .required()

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(body: CreateUserDto) {
    const { name, email, password, githubUsername } = body

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
        githubUsername,
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
      githubUsername: user.githubUsername,
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

    const { name, email, password, githubUsername } = body

    await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        name,
        email,
        password,
        githubUsername,
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

    await this.prisma.user.delete({
      where: {
        id,
      },
    })
  }
}
