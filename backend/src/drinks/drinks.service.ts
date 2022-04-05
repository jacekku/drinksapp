import { Injectable } from '@nestjs/common';
import fetch from 'cross-fetch';
import { Drink } from './model/drink.model';
import { Ingredient } from './model/ingredient.model';
import { IngredientDTO } from './model/ingredientDTO.model';

@Injectable()
export class DrinksService {
  private drinksUrlBase = 'www.thecocktaildb.com/api/json/v1/1/';
  private searchUrl = 'search.php?';

  async findDrinks(queryString: string): Promise<Drink[]> {
    const searchParams = new URLSearchParams({ s: queryString });
    const drinkResponse: { drinks: DrinkSearchDTO[] } =
      await this.performGetWithSearchParams(searchParams);
    return drinkResponse.drinks.map((drinkDto) => Drink.fromDTO(drinkDto));
  }

  async findIngredient(queryString: string): Promise<Ingredient[]> {
    const searchParams = new URLSearchParams({ i: queryString });
    const ingredients: { ingredients: IngredientDTO[] } =
      await this.performGetWithSearchParams(searchParams);
    return ingredients.ingredients.map((ingredient) =>
      Ingredient.fromDTO(ingredient),
    );
  }

  async performGetWithSearchParams(searchParams: URLSearchParams) {
    return fetch(
      `https://${this.drinksUrlBase + this.searchUrl + searchParams}`,
    ).then((body) => body.json());
  }
}
