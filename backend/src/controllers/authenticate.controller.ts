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
import { ApiTags, ApiOperation } from '@nestjs/swagger'
import { CreateAuthDto } from 'src/dtos/create-auth.dto'

const authenticateSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

@Controller('/auth')
@ApiTags('auth')
export class AuthenticateController {
  constructor(
    private jwt: JwtService,
    private prisma: PrismaService,
  ) {}

  @ApiOperation({ summary: 'Authenticate user' })
  @Post()
  @UsePipes(new ZodValidationPipe(authenticateSchema))
  async handler(@Body() body: CreateAuthDto) {
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
