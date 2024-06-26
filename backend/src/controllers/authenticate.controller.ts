import {
  Body,
  Controller,
  Post,
  UnauthorizedException,
  UsePipes,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { compare } from 'bcryptjs'
import { ZodValidationPipe } from 'src/pipes/zod-validation'
import { PrismaService } from 'src/prisma/prisma.service'
import { z } from 'zod'

const authenticateSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

type AuthenticateInput = z.infer<typeof authenticateSchema>

@Controller('/auth')
export class AuthenticateController {
  constructor(
    private jwt: JwtService,
    private prisma: PrismaService,
  ) {}

  @Post()
  @UsePipes(new ZodValidationPipe(authenticateSchema))
  async handler(@Body() body: AuthenticateInput) {
    const { email, password } = body

    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!user) {
      throw new UnauthorizedException('Email ou senha inválidos')
    }

    const isPasswordValid = await compare(password, user.password)

    if (!isPasswordValid) {
      throw new UnauthorizedException('Email ou senha inválidos')
    }

    const accessToken = this.jwt.sign({ sub: user.id })

    return { access_token: accessToken }
  }
}
