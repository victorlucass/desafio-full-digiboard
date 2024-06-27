import { ApiProperty } from '@nestjs/swagger'

export class CreateUserDto {
  @ApiProperty({
    description: 'Nome do usuário',
  })
  name: string

  @ApiProperty({
    description: 'Email do usuário',
  })
  email: string

  @ApiProperty({
    description: 'Senha do usuário',
  })
  password: string

  @ApiProperty({
    description: 'Nome de usuário do GitHub',
  })
  githubUsername: string
}
