export default function Register(props: { setToken: CallableFunction }) {
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const [username, password, confirmPassword] = [
            (e as any).target[0].value,
            (e as any).target[1].value,
            (e as any).target[2].value,
          ];
          if (password != confirmPassword) {
            alert("passwords must be the same");
          }

          fetch(`http://localhost:4000/users/create`, {
            method: "POST",
            body: JSON.stringify({
              username,
              password,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((body) => body.json())
            .then((body) => {
              if (body.statusCode == 400) {
                return alert(body.message);
              }
              props.setToken(body.access_token, body.exp);
            })
            .catch((err) => {
              console.error("Error:", err);
            });
        }}
      >
        <input id="username" type={"text"} placeholder="username"></input>
        <br />
        <input id="password" type={"password"} placeholder="password"></input>
        <br />
        <input
          id="password"
          type={"password"}
          placeholder="confirm password"
        ></input>
        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
