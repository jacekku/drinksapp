import { Controller, Get, Headers } from '@nestjs/common';
import { ActivityService } from '../activity/activity.service';
import { Activity } from './model/activity.model';

@Controller('activity')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Get()
  async findDrinks(@Headers() headers: any): Promise<string[]> {
    return await this.activityService.getSearchHistory(headers.authorization);
  }
}
