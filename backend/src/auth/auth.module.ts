import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { Env } from 'src/env'
import { JwtStrategy } from 'src/auth/jwt-strategy'
@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      global: true,
      useFactory(config: ConfigService<Env, true>) {
        const privateKey = config.get('JWT_PRIVATE_KEY', { infer: true })
        const publickey = config.get('JWT_PUBLIC_KEY', { infer: true })
        return {
          signOptions: { algorithm: 'RS256', expiresIn: '1d' },
          privateKey: Buffer.from(privateKey, 'base64'),
          publicKey: Buffer.from(publickey, 'base64'),
        }
      },
    }),
  ],
  providers: [JwtStrategy],
})
export class AuthModule {}
