import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { HashingService } from '../auth/hashing.service';
import { JwtStrategy } from '../auth/jwt.strategy';
import { User, UserSchema } from './model/user.model';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [UsersService, HashingService, JwtStrategy],
})
export class UsersModule {}
