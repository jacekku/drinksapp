import { Controller, Get, Param } from '@nestjs/common';
import { DrinksService } from './drinks.service';
import { Drink } from './model/drink.model';
import { Ingredient } from './model/ingredient.model';

@Controller('drinks')
export class DrinksController {
  constructor(private readonly drinkService: DrinksService) {}

  @Get('drink/:query')
  async findDrinks(@Param('query') queryString: string): Promise<Drink[]> {
    return await this.drinkService.findDrinks(queryString);
  }

  @Get('ingredient/:query')
  async findIngredient(
    @Param('query') queryString: string,
  ): Promise<Ingredient[]> {
    return await this.drinkService.findIngredient(queryString);
  }
}
