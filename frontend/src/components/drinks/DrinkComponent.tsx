import { Drink } from "../../models/drink.model";
import "./DrinkComponent.css";
class Props {
  drink!: Drink;
}

export default function DrinkComponent(props: Props) {
  return (
    <div className="Drink">
      <p>{props.drink.drink}</p>
      <img
        src={props.drink.drinkThumb}
        alt={props.drink.drink}
        width="100px"
      ></img>
    </div>
  );
}
