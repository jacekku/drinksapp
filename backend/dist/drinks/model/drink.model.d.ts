declare type Alcoholic = 'Alcoholic' | 'Non Alcoholic';
declare type Category = 'Ordinary Drink' | 'Shot' | 'Coffee / Tea' | 'Other/Unknown' | 'Cocktail';
declare class DrinkIngredient {
    name: string;
    measure: string;
}
export declare class Drink {
    idDrink: string;
    drink: string;
    drinkAlternate: string;
    tags: string;
    video: string;
    category: Category;
    IBA: string;
    alcoholic: Alcoholic;
    glass: string;
    drinkThumb: string;
    imageSource: string;
    imageAttribution: string;
    creativeCommonsConfirmed: string;
    dateModified: string;
    ingredients: DrinkIngredient[];
    instructions: {
        en: string;
        es: string;
        de: string;
        fr: string;
        it: string;
        zh_hans: string;
        zh_hant: string;
    };
    static fromDTO(drinkSearchDTO: DrinkSearchDTO): Drink;
}
export {};
