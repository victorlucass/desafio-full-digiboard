import { ConflictException, Injectable } from '@nestjs/common'
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
  constructor(private prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    const {
      name,
      code,
      description,
      entryDate,
      expiryDate,
      stock,
      price,
      imgUrl,
    } = createProductDto

    const productWithSameCode = await this.prisma.product.findMany({
      where: {
        code,
      },
    })

    if (productWithSameCode.length > 0) {
      console.log(productWithSameCode)

      throw new ConflictException('Esse código já existe')
    }

    await this.prisma.product.create({
      data: {
        name,
        code,
        description,
        entryDate,
        expiryDate,
        stock,
        price,
        imgUrl,
      },
    })
  }

  async getProductById(id: string) {
    const product = await this.prisma.product.findUnique({
      where: {
        id,
      },
    })

    if (!product) {
      throw new Error('Produto não encontrado')
    }

    return product
  }

  async update(id: string, body: CreateProductDto) {
    const product = await this.prisma.product.findUnique({
      where: {
        id,
      },
    })

    if (!product) {
      throw new Error('Produto não encontrado')
    }

    await this.prisma.product.update({
      where: {
        id,
      },
      data: {
        ...body,
      },
    })
  }

  async delete(id: string) {
    const product = await this.prisma.product.findUnique({
      where: {
        id,
      },
    })

    if (!product) {
      throw new Error('Produto não encontrado')
    }

    await this.prisma.product.delete({
      where: {
        id,
      },
    })
  }
}
