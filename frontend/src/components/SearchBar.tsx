class Props {
  searchForDrinks!: CallableFunction;
  searchForIngredients!: CallableFunction;
  showDrinks!: CallableFunction;
}

export default function SearchBar(props: Props) {
  return (
    <div className="SearchBar">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const [queryText, drinkRadioButtonSelected] = [
            (e as any).target[0].value,
            (e as any).target[1].checked,
          ];
          if (drinkRadioButtonSelected) return props.searchForDrinks(queryText);
          return props.searchForIngredients(queryText);
        }}
      >
        <input id="text" type={"text"}></input>
        <br></br>
        <label htmlFor="drinkRadioButton">Search for drinks</label>
        <input
          id="drinkRadioButton"
          name="searchType"
          checked={true}
          type={"radio"}
          onClick={(e) => {
            props.showDrinks(true);
          }}
        ></input>
        <br></br>
        <label htmlFor="ingredientRadioButton">Search for ingredients</label>
        <input
          id="ingredientRadioButton"
          name="searchType"
          type={"radio"}
          onClick={(e) => {
            props.showDrinks(false);
          }}
        ></input>
        <br></br>
        <button type="submit">Search</button>
      </form>
    </div>
  );
}
