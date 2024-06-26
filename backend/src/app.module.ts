import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { CreateUserController } from './controllers/create-user.controller'
import { ConfigModule } from '@nestjs/config'
import { envSchema } from './env'
import { AuthModule } from './auth/auth.module'
import { AuthenticateController } from './controllers/authenticate.controller'
import { ProductsController } from './controllers/create-product'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (input) => envSchema.parse(input),
      isGlobal: true,
    }),
    AuthModule,
  ],
  controllers: [
    CreateUserController,
    AuthenticateController,
    ProductsController,
  ],
  providers: [PrismaService],
})
export class AppModule {}
