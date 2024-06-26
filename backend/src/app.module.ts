import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { CreateUserController } from './controllers/create-user.controller'
import { ConfigModule } from '@nestjs/config'
import { envSchema } from './env'
@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (input) => envSchema.parse(input),
      isGlobal: true,
    }),
  ],
  controllers: [CreateUserController],
  providers: [PrismaService],
})
export class AppModule {}
