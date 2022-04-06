import { useState } from "react";
import DrinkList from "./drinks/DrinkList";
import IngredientComponent from "./ingredients/IngredientComponent";
import SearchBar from "./SearchBar";

export default function Home(props: { token: string }) {
  const [drinks, setDrinks] = useState([]);
  const [ingredient, setIngredient] = useState({} as any);

  const [showDrinks, setShowDrinks] = useState(true);

  const searchForDrinks = (query: string) => {
    if (!query.length) return;
    const token = props.token ? `Bearer ${props.token}` : "";
    fetch(`http://localhost:4000/drinks/drink/${query}`, {
      headers: {
        Authorization: token,
      },
    })
      .then((body) => body.json())
      .then(setDrinks)
      .catch((err) => console.error(err));
  };

  const searchForIngredients = (query: string) => {
    if (!query.length) return;
    const token = props.token ? `Bearer ${props.token}` : "";

    fetch(`http://localhost:4000/drinks/ingredient/${query}`, {
      headers: {
        Authorization: token,
      },
    })
      .then((body) => body.json())
      .then((body) => setIngredient(body[0]))
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <SearchBar
        searchForDrinks={searchForDrinks}
        searchForIngredients={searchForIngredients}
        showDrinks={setShowDrinks}
      ></SearchBar>
      {showDrinks ? (
        <DrinkList drinks={drinks}></DrinkList>
      ) : (
        <IngredientComponent ingredient={ingredient}></IngredientComponent>
      )}
    </div>
  );
}
