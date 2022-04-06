"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ingredient = void 0;
class Ingredient {
    static fromDTO(ingredientDTO) {
        return {
            idIngredient: ingredientDTO.idIngredient,
            ingredient: ingredientDTO.strIngredient,
            description: ingredientDTO.strDescription,
            type: ingredientDTO.strType,
            alcohol: ingredientDTO.strAlcohol,
            ABV: ingredientDTO.strABV,
        };
    }
}
exports.Ingredient = Ingredient;
//# sourceMappingURL=ingredient.model.js.map