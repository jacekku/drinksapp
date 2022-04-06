import {
  Controller,
  Get,
  Headers,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ActivityService } from '../activity/activity.service';
import { JwtAuthGuard } from '../auth/jwtAuth.guard';

@Controller('activity')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findDrinks(@Headers() headers: any): Promise<string[]> {
    return await this.activityService.getSearchHistory(headers.authorization);
  }

  @UseGuards(JwtAuthGuard)
  @Post('favorite/:drinkId')
  async favoriteDrink(
    @Headers() headers: any,
    @Param('drinkId') drinkId,
  ): Promise<void> {
    return await this.activityService.addFavoriteDrink(
      headers.authorization,
      drinkId,
    );
  }
  @UseGuards(JwtAuthGuard)
  @Get('favorite')
  async getFavorites(@Headers() headers: any): Promise<string[]> {
    return await this.activityService.getFavorites(headers.authorization);
  }
}
