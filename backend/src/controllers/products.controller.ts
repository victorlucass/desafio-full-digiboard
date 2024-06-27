import { Controller, Post, Body, UseGuards, Get, Param } from '@nestjs/common'
import { ProductsService } from '../services/products.service'
import { CreateProductDto } from '../dtos/create-product.dto'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { ApiTags, ApiOperation } from '@nestjs/swagger'

@Controller('/products')
@UseGuards(JwtAuthGuard)
@ApiTags('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @ApiOperation({ summary: 'Create product' })
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto)
  }

  @ApiOperation({ summary: 'Get product by id' })
  @Get('/:id')
  getProductById(@Param('id') id: string) {
    return this.productsService.getProductById(id)
  }
}
