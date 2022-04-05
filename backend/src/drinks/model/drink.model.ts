type Alcoholic = 'Alcoholic' | 'Non Alcoholic';
type Category =
  | 'Ordinary Drink'
  | 'Shot'
  | 'Coffee / Tea'
  | 'Other/Unknown'
  | 'Cocktail';

class DrinkIngredient {
  name: string;
  measure: string;
}

export class Drink {
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

  public static fromDTO(drinkSearchDTO: DrinkSearchDTO): Drink {
    return <Drink>{
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
          .map(
            (_, index) =>
              <DrinkIngredient>{
                name: drinkSearchDTO[`strIngredient${index + 1}`],
                measure: drinkSearchDTO[`strMeasure${index + 1}`],
              },
          )
          .filter(
            (ingredient) =>
              Boolean(ingredient.name) || Boolean(ingredient.measure),
          ),
      ],
    };
  }
}
