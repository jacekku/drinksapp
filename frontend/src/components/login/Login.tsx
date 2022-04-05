export default function Login(props: { setToken: CallableFunction }) {
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const [username, password] = [
            (e as any).target[0].value,
            (e as any).target[1].value,
          ];
          fetch(`http://localhost:4000/users/login`, {
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
              props.setToken(body.access_token, body.exp);
              history.state.push("/");
            })
            .catch((err) => console.error(err));
        }}
      >
        <input id="username" type={"text"}></input>
        <br />
        <input id="password" type={"password"}></input>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
