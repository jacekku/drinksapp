import { IngredientDTO } from './ingredientDTO.model';

export class Ingredient {
  idIngredient: string;
  ingredient: string;
  description: string;
  type: string;
  alcohol: string;
  ABV: string;

  public static fromDTO(ingredientDTO: IngredientDTO) {
    return <Ingredient>{
      idIngredient: ingredientDTO.idIngredient,
      ingredient: ingredientDTO.strIngredient,
      description: ingredientDTO.strDescription,
      type: ingredientDTO.strType,
      alcohol: ingredientDTO.strAlcohol,
      ABV: ingredientDTO.strABV,
    };
  }
}
