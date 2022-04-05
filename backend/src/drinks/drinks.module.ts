import { Module } from '@nestjs/common';
import { JwtStrategy } from '../auth/jwt.strategy';
import { DrinksController } from './drinks.controller';
import { DrinksService } from './drinks.service';

@Module({
  imports: [],
  controllers: [DrinksController],
  providers: [DrinksService],
})
export class DrinksModule {}
