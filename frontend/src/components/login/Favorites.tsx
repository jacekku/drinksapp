import { useState } from "react";

export default function Favorites(props: { token: string }) {
  const [favorites, setFavorites] = useState([]);
  function getFavorites() {
    const token = props.token ? `Bearer ${props.token}` : "";
    fetch(`http://localhost:4000/activity/favorite`, {
      headers: {
        Authorization: token,
      },
    })
      .then((body) => body.json())
      .then((body) => {
        if (!body.statusCode) setFavorites(body);
      })
      .catch((err) => console.error(err));
  }

  return (
    <div>
      <button onClick={getFavorites}>Get favorites</button>
      {favorites.map((item) => {
        return <div>{item}</div>;
      })}
    </div>
  );
}
