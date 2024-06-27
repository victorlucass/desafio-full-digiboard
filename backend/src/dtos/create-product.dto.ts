import { ApiProperty } from '@nestjs/swagger'

export class CreateProductDto {
  @ApiProperty({
    description: 'Código do produto',
  })
  code: string

  @ApiProperty({
    description: 'Nome do produto',
  })
  name: string

  @ApiProperty({
    description: 'Descrição do produto',
  })
  description: string

  @ApiProperty({
    description: 'Data de entrada do produto',
  })
  entryDate: string

  @ApiProperty({
    description: 'Data de expiração do produto',
  })
  expiryDate: string

  @ApiProperty({
    description: 'Estoque do produto',
  })
  stock: number

  @ApiProperty({
    description: 'Preço do produto',
  })
  price: number

  @ApiProperty({
    description: 'Imagem do produto',
  })
  imgUrl: string
}
// 2024-06-26T14:30:00Z -> modelo de data
