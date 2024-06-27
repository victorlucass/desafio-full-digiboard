import { Controller, Post, Body, UseGuards, Get, Param } from '@nestjs/common'
import { ProductsService } from '../services/products.service'
import { CreateProductDto } from '../dtos/create-product.dto'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'

@Controller('/products')
@UseGuards(JwtAuthGuard)
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto)
  }

  @Get('/:id')
  getProductById(@Param('id') id: string) {
    return this.productsService.getProductById(id)
  }
}
