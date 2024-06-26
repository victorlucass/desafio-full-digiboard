import { Controller, Post, UseGuards } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { CurrentUser } from '../auth/current-user-decorator'
import { UserPayload } from 'src/auth/jwt-strategy'

@Controller('/products')
@UseGuards(JwtAuthGuard)
export class ProductsController {
  constructor(private prisma: PrismaService) {}

  @Post()
  getPaidProducts(@CurrentUser() user: UserPayload) {
    console.log(user.sub)
    return {
      test: 'ok',
    }
  }
}
