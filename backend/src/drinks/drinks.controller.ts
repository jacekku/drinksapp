import { Controller, Get, Param, Headers } from '@nestjs/common';
import { ActivityService } from '../activity/activity.service';
import { DrinksService } from './drinks.service';
import { Drink } from './model/drink.model';
import { Ingredient } from './model/ingredient.model';

@Controller('drinks')
export class DrinksController {
  constructor(
    private readonly drinkService: DrinksService,
    private readonly activityService: ActivityService,
  ) {}

  @Get('drink/:query')
  async findDrinks(
    @Param('query') queryString: string,
    @Headers() headers: any,
  ): Promise<Drink[]> {
    this.activityService.addSearchActivity(headers.authorization, queryString);

    return await this.drinkService.findDrinks(queryString);
  }

  @Get('ingredient/:query')
  async findIngredient(
    @Param('query') queryString: string,
    @Headers() headers: any,
  ): Promise<Ingredient[]> {
    this.activityService.addSearchActivity(headers.authorization, queryString);

    return await this.drinkService.findIngredient(queryString);
  }
}
