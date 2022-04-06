import { useState } from "react";

export default function SearchHistory(props: { token: string }) {
  const [searchHistory, setSearchHistory] = useState([]);

  function downloadSearchHistory() {
    const token = props.token ? `Bearer ${props.token}` : "";
    fetch(`http://localhost:4000/activity`, {
      headers: {
        Authorization: token,
      },
    })
      .then((body) => body.json())
      .then((body) => {
        if (!body.statusCode) setSearchHistory(body);
      })
      .catch((err) => console.error(err));
  }
  return (
    <div>
      <button onClick={downloadSearchHistory}>Get history</button>
      {searchHistory.map((item) => {
        return <div>{item}</div>;
      })}
    </div>
  );
}
