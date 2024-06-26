import { ConflictException, Injectable, UsePipes } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateUserDto } from '../dtos/create-user.dto'
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

@Injectable()
@UsePipes(new ZodValidationPipe(createUserSchema))
export class UsersService {
  constructor(private prisma: PrismaService) {}

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
}
