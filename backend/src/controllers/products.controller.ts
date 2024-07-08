import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Param,
  Put,
  UsePipes,
  Delete,
  Query,
} from '@nestjs/common'
import {
  ProductsService,
  createProductSchema,
} from '../services/products.service'
import { CreateProductDto } from '../dtos/create-product.dto'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { ApiTags, ApiOperation } from '@nestjs/swagger'
import { ZodValidationPipe } from 'src/pipes/zod-validation'

const bodyValidationPipe = new ZodValidationPipe(createProductSchema)

@Controller('/products')
@UseGuards(JwtAuthGuard)
@ApiTags('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiOperation({ summary: 'Get all products' })
  @Get()
  findAll(@Query('name') query?: string) {
    return this.productsService.findAll(query)
  }

  @ApiOperation({ summary: 'Get all products by expiry date' })
  @Get('/expiry-date')
  findAllByExpiryDate(@Query('name') query?: string) {
    return this.productsService.findOnlyExpired(query)
  }

  @ApiOperation({ summary: 'Get all products not expired' })
  @Get('/available')
  findAllByNotExpired(@Query('name') query?: string) {
    return this.productsService.findOnlyAvailable(query)
  }

  @ApiOperation({ summary: 'Create product' })
  @Post()
  @UsePipes(bodyValidationPipe)
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto)
  }

  @ApiOperation({ summary: 'Get product by id' })
  @Get('/:id')
  getProductById(@Param('id') id: string) {
    return this.productsService.getProductById(id)
  }

  @ApiOperation({ summary: 'Update product' })
  @Put('/:id')
  update(
    @Param('id') id: string,
    @Body(bodyValidationPipe) body: CreateProductDto,
  ) {
    return this.productsService.update(id, body)
  }

  @ApiOperation({ summary: 'Delete product' })
  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.productsService.delete(id)
  }
}
