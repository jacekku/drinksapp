import { IngredientDTO } from './ingredientDTO.model';
export declare class Ingredient {
    idIngredient: string;
    ingredient: string;
    description: string;
    type: string;
    alcohol: string;
    ABV: string;
    static fromDTO(ingredientDTO: IngredientDTO): Ingredient;
}
