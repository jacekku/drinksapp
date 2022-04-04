import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { Drink } from './model/drink.model';
import { DrinkService } from './drinks/drink.service';
import { Ingredient } from './model/ingredient.model';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly drinkService: DrinkService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('findDrink/:query')
  async findDrinks(@Param('query') queryString: string): Promise<Drink[]> {
    return await this.drinkService.findDrinks(queryString);
  }

  @Get('findIngredient/:query')
  async findIngredient(
    @Param('query') queryString: string,
  ): Promise<Ingredient[]> {
    return await this.drinkService.findIngredient(queryString);
  }
}
