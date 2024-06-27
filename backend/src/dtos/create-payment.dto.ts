import { ApiProperty } from '@nestjs/swagger'

export class CreatePaymentDto {
  @ApiProperty({
    description: 'ID do Produto',
  })
  productId: string

  @ApiProperty({
    description: 'ID do Usuário',
  })
  userId: string

  @ApiProperty({
    description: 'Quantidade',
  })
  quantity: number
}
