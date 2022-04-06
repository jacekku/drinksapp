import { ActivityService } from '../activity/activity.service';
import { DrinksService } from './drinks.service';
import { Drink } from './model/drink.model';
import { Ingredient } from './model/ingredient.model';
export declare class DrinksController {
    private readonly drinkService;
    private readonly activityService;
    constructor(drinkService: DrinksService, activityService: ActivityService);
    findDrinks(queryString: string, headers: any): Promise<Drink[]>;
    findIngredient(queryString: string, headers: any): Promise<Ingredient[]>;
}
