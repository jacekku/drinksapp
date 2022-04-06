import "./App.css";

import { HashRouter, NavLink, Route, Router, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/login/Login";
import { useState, useEffect } from "react";
import Register from "./components/login/Register";
import ChangePassword from "./components/login/ChangePassword";
import Profile from "./components/login/Profile";

function App() {
  const [token, setToken] = useState("");

  function wrappedSetToken(token: string, tokenExp: string) {
    localStorage.setItem("token", token);
    localStorage.setItem("tokenExp", tokenExp);
    setToken(token);
  }

  function refreshToken(token: string) {
    fetch(`http://localhost:4000/users/token`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((body) => body.json())
      .then((body) => {
        if (body.statusCode == 400) {
          return alert(body.message);
        }
        wrappedSetToken(body.access_token, body.exp);
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  }

  useEffect(() => {
    const tokenExp = Number(localStorage.getItem("tokenExp"));
    const date = new Date(0).setUTCSeconds(tokenExp);
    if (date > Date.now()) {
      refreshToken(localStorage.getItem("token") || "");
    }
  });

  return (
    <div className="App">
      {token}
      <HashRouter>
        <div className="header">
          <NavLink to="/">Home</NavLink>

          {!token ? (
            <div>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/register">Register</NavLink>
            </div>
          ) : (
            <div>
              <NavLink to="/profile">Profile</NavLink>
            </div>
          )}
        </div>
        <Routes>
          <Route path="/" element={<Home token={token} />}></Route>
          <Route
            path="/login"
            element={<Login setToken={wrappedSetToken} />}
          ></Route>
          <Route
            path="/register"
            element={<Register setToken={wrappedSetToken} />}
          ></Route>
          <Route
            path="/profile"
            element={<Profile setToken={wrappedSetToken} token={token} />}
          ></Route>
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
