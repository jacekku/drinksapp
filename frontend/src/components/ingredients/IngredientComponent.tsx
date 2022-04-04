import { Ingredient } from "../../models/ingredient.model";

class Props {
  ingredient!: Ingredient;
}

export default function IngredientComponent(props: Props) {
  return (
    <div className="Ingredient">
      <p>Name: {props.ingredient.ingredient}</p>
      <p>Type: {props.ingredient.type}</p>
      <p>Alcohol: {props.ingredient.alcohol}</p>
      <p>Alcohol by volume: {props.ingredient.ABV}</p>
      <p>Description: {props.ingredient.description}</p>
    </div>
  );
}
