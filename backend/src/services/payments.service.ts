import { Injectable, BadRequestException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreatePaymentDto } from '../dtos/create-payment.dto'
import { z } from 'zod'

export const paymentSchema = z.object({
  productId: z.string(),
  userId: z.string(),
  quantity: z.number(),
})
@Injectable()
export class PaymentsService {
  constructor(private prisma: PrismaService) {}

  async create(createPaymentDto: CreatePaymentDto) {
    const product = await this.prisma.product.findUnique({
      where: { id: createPaymentDto.productId },
    })

    if (!product) {
      throw new BadRequestException('Produto inválido')
    }

    if (!product || new Date() > new Date(product.expiryDate)) {
      throw new BadRequestException('Produto inválido ou expirado')
    }

    if (product.stock < createPaymentDto.quantity) {
      throw new BadRequestException('Estoque insuficiente')
    }

    await this.prisma.product.update({
      where: { id: createPaymentDto.productId },
      data: { stock: product.stock - createPaymentDto.quantity },
    })

    return this.prisma.payment.create({
      data: {
        ...createPaymentDto,
        deliveryDate: new Date(),
        status: 'pago',
      },
    })
  }

  async update(id: string, body: CreatePaymentDto) {
    const payment = await this.prisma.payment.findUnique({
      where: { id },
    })

    if (!payment) {
      throw new Error('Pagamento não encontrado')
    }

    await this.prisma.payment.update({
      where: { id },
      data: {
        ...body,
      },
    })
  }

  async findAll() {
    return this.prisma.payment.findMany({
      include: { product: true, user: true },
    })
  }

  async findOne(id: string) {
    const payment = await this.prisma.payment.findUnique({
      where: { id },
    })

    if (!payment) {
      throw new Error('Pagamento não encontrado')
    }

    return payment
  }
}
