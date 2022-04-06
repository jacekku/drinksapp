import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ActivityController } from '../activity/activity.controller';
import { ActivityService } from '../activity/activity.service';
import { Activity, ActivitySchema } from '../activity/model/activity.model';
import { AuthModule } from '../auth/auth.module';
import { DrinksController } from './drinks.controller';
import { DrinksService } from './drinks.service';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: Activity.name, schema: ActivitySchema },
    ]),
  ],
  controllers: [DrinksController, ActivityController],
  providers: [DrinksService, ActivityService],
})
export class DrinksModule {}
