"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Drink = void 0;
class DrinkIngredient {
}
class Drink {
    static fromDTO(drinkSearchDTO) {
        return {
            idDrink: drinkSearchDTO.idDrink,
            drink: drinkSearchDTO.strDrink,
            drinkAlternate: drinkSearchDTO.strDrinkAlternate,
            tags: drinkSearchDTO.strTags,
            video: drinkSearchDTO.strVideo,
            category: drinkSearchDTO.strCategory,
            IBA: drinkSearchDTO.strIBA,
            alcoholic: drinkSearchDTO.strAlcoholic,
            glass: drinkSearchDTO.strGlass,
            drinkThumb: drinkSearchDTO.strDrinkThumb,
            imageSource: drinkSearchDTO.strImageSource,
            imageAttribution: drinkSearchDTO.strImageAttribution,
            creativeCommonsConfirmed: drinkSearchDTO.strCreativeCommonsConfirmed,
            dateModified: drinkSearchDTO.dateModified,
            instructions: {
                en: drinkSearchDTO.strInstructions,
                de: drinkSearchDTO.strInstructionsDE,
                es: drinkSearchDTO.strInstructionsES,
                fr: drinkSearchDTO.strInstructionsFR,
                it: drinkSearchDTO.strInstructionsIT,
                zh_hans: drinkSearchDTO.strInstructionsZH_HANS,
                zh_hant: drinkSearchDTO.strInstructionsZH_HANT,
            },
            ingredients: [
                ...Array.from({ length: 14 })
                    .map((_, index) => ({
                    name: drinkSearchDTO[`strIngredient${index + 1}`],
                    measure: drinkSearchDTO[`strMeasure${index + 1}`],
                }))
                    .filter((ingredient) => Boolean(ingredient.name) || Boolean(ingredient.measure)),
            ],
        };
    }
}
exports.Drink = Drink;
//# sourceMappingURL=drink.model.js.map