import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DrinkService } from './drinks/drink.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, DrinkService],
})
export class AppModule {}
