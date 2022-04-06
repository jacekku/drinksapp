import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

@Global()
@Module({
  imports: [
    JwtModule.register({
      secretOrKeyProvider: () => {
        return process.env.jwtSecret;
      },
      signOptions: { expiresIn: '600s' },
    }),
  ],
  exports: [JwtModule],
})
export class AuthModule {}
