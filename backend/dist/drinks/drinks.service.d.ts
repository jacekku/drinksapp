import { Drink } from './model/drink.model';
import { Ingredient } from './model/ingredient.model';
export declare class DrinksService {
    private drinksUrlBase;
    private searchUrl;
    findDrinks(queryString: string): Promise<Drink[]>;
    findIngredient(queryString: string): Promise<Ingredient[]>;
    performGetWithSearchParams(searchParams: URLSearchParams): Promise<any>;
}
