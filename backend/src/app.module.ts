import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { CreateUserController } from './controllers/users.controller'
import { ConfigModule } from '@nestjs/config'
import { envSchema } from './env'
import { AuthModule } from './auth/auth.module'
import { AuthenticateController } from './controllers/authenticate.controller'
import { ProductsController } from './controllers/products.controller'
import { UsersService } from './services/users.service'
import { ProductsService } from './services/products.service'
import { PaymentsController } from './controllers/payments.controller'
import { PaymentsService } from './services/payments.service'

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
    PaymentsController,
  ],
  providers: [PrismaService, UsersService, ProductsService, PaymentsService],
})
export class AppModule {}
