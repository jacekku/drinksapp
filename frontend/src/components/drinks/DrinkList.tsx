import { Drink } from "../../models/drink.model";
import DrinkComponent from "./DrinkComponent";

class Props {
  drinks!: Drink[];
}

export default function DrinkList(props: Props) {
  return (
    <div className="DrinkList">
      {props.drinks.map((drink) => (
        <DrinkComponent drink={drink} key={drink.idDrink}></DrinkComponent>
      ))}
    </div>
  );
}
