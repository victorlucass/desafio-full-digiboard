import { Controller, Post, UseGuards } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'

@Controller('/products')
@UseGuards(JwtAuthGuard)
export class ProductsController {
  constructor(private prisma: PrismaService) {}

  @Post()
  getPaidProducts() {
    return {
      test: 'ok',
    }
  }
}
