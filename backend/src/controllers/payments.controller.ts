import {
  Controller,
  Get,
  Post,
  Body,
  UsePipes,
  UseGuards,
  Param,
  Put,
} from '@nestjs/common'
import { PaymentsService, paymentSchema } from '../services/payments.service'
import { CreatePaymentDto } from '../dtos/create-payment.dto'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { ZodValidationPipe } from 'src/pipes/zod-validation'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'

@Controller('payments')
@ApiTags('Pagamentos')
@UseGuards(JwtAuthGuard)
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @UsePipes(new ZodValidationPipe(paymentSchema))
  @Post()
  @ApiOperation({ summary: 'Create payment' })
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentsService.create(createPaymentDto)
  }

  @Get()
  @ApiOperation({ summary: 'Get all payments' })
  findAll() {
    return this.paymentsService.findAll()
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get payment by id' })
  findOne(@Param('id') id: string) {
    return this.paymentsService.findOne(id)
  }

  @UsePipes(new ZodValidationPipe(paymentSchema))
  @Put('/:id')
  @ApiOperation({ summary: 'Update payment' })
  update(@Param('id') id: string, @Body() body: CreatePaymentDto) {
    return this.paymentsService.update(id, body)
  }
}
