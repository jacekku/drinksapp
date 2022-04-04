import { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import DrinkList from "./components/drinks/DrinkList";
import SearchBar from "./components/SearchBar";
import { Ingredient } from "./models/ingredient.model";
import IngredientComponent from "./components/ingredients/IngredientComponent";

function App() {
  const [drinks, setDrinks] = useState([]);
  const [ingredient, setIngredient] = useState({} as any);

  const [showDrinks, setShowDrinks] = useState(true);

  const searchForDrinks = (query: string) => {
    if (!query.length) return;
    fetch(`http://localhost:4000/findDrink/${query}`)
      .then((body) => body.json())
      .then(setDrinks)
      .catch((err) => console.error(err));
  };

  const searchForIngredients = (query: string) => {
    if (!query.length) return;
    fetch(`http://localhost:4000/findIngredient/${query}`)
      .then((body) => body.json())
      .then((body) => setIngredient(body[0]))
      .catch((err) => console.error(err));
  };

  return (
    <div className="App">
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

export default App;
