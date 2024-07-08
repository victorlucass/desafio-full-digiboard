import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { CreateProductDto } from 'src/dtos/create-product.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { z } from 'zod'

export const createProductSchema = z
  .object({
    code: z.string(),
    description: z.string(),
    entryDate: z.string(),
    expiryDate: z.string(),
    stock: z.number(),
    price: z.number(),
    imgUrl: z.string(),
    name: z.string(),
  })
  .required()

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.product.findMany()
  }

  async findOnlyExpired() {
    return this.prisma.product.findMany({
      where: {
        expiryDate: {
          lt: new Date(),
        },
      },
      orderBy: {
        expiryDate: 'asc',
      },
    })
  }

  async findOnlyNotExpired() {
    return this.prisma.product.findMany({
      where: {
        expiryDate: {
          gte: new Date(),
        },
      },
      orderBy: {
        expiryDate: 'asc',
      },
    })
  }

  async create(createProductDto: CreateProductDto) {
    const { code } = createProductDto

    const productWithSameCode = await this.prisma.product.findUnique({
      where: { code },
    })

    if (productWithSameCode) {
      throw new ConflictException('Esse código já existe')
    }

    await this.prisma.product.create({ data: createProductDto })
  }

  async getProductById(id: string) {
    const product = await this.prisma.product.findUnique({ where: { id } })

    if (!product) {
      throw new NotFoundException('Produto não encontrado')
    }

    return product
  }

  async update(id: string, updateProductDto: CreateProductDto) {
    await this.ensureProductExists(id)

    await this.prisma.product.update({
      where: { id },
      data: updateProductDto,
    })
  }

  async delete(id: string) {
    await this.ensureProductExists(id)

    await this.prisma.payment.deleteMany({
      where: { productId: id },
    })

    await this.prisma.product.delete({
      where: { id },
    })
  }

  private async ensureProductExists(id: string) {
    const product = await this.prisma.product.findUnique({ where: { id } })
    if (!product) {
      throw new NotFoundException('Produto não encontrado')
    }
  }
}
