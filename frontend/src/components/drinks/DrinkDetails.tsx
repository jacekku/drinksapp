import { useLocation } from "react-router-dom";
import { Drink } from "../../models/drink.model";

export default function DrinkDetails(props: any) {
  const location = useLocation() as any;
  const drink = location.state.aboutProps.drink as Drink;

  function addFavorite() {
    const token = localStorage.getItem("token");
    if (!token) return;
    fetch(`http://localhost:4000/activity/favorite/${drink.idDrink}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return (
    <div>
      <img src={drink.drinkThumb} height="100px"></img>
      <br></br>
      <button onClick={addFavorite}> Favorite </button>
      <p>Name: {drink.drink}</p>
      <p>{drink.IBA}</p>
      <p>Alcoholic: {drink.alcoholic}</p>
      <p>Glass to use: {drink.glass}</p>
      <table>
        <thead>
          <th>Ingredient</th>
          <th>Amount</th>
        </thead>
        {drink.ingredients.map((ingredient) => {
          return (
            <tr>
              <td>{ingredient.name}</td>
              <td>{ingredient.measure}</td>
            </tr>
          );
        })}
      </table>
      <p>{drink.instructions.en}</p>
    </div>
  );
}
