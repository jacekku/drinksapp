import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { env } from 'process';
import { HashingService } from '../auth/hashing.service';
import { JwtStrategy } from '../auth/jwt.strategy';
import { User, UserSchema } from './model/user.model';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      secretOrKeyProvider: () => {
        return process.env.jwtSecret;
      },
      signOptions: { expiresIn: '600s' },
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService, HashingService, JwtStrategy],
})
export class UsersModule {}
