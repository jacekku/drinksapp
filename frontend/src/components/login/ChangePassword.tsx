export default function ChangePassword(props: { setToken: CallableFunction }) {
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const [oldPassword, newPassword, newPassword2] = [
            (e as any).target[0].value,
            (e as any).target[1].value,
            (e as any).target[2].value,
          ];

          if (newPassword != newPassword2) {
            return alert("passwords must be the same");
          }

          fetch(`http://localhost:4000/users/reset`, {
            method: "POST",
            body: JSON.stringify({
              oldPassword,
              newPassword,
            }),
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
              "Content-Type": "application/json",
            },
          })
            .then((body) => body.json())
            .then((body) => {
              if (body.access_token) {
                props.setToken(body.access_token, body.exp);
                history.state.push("/");
              }
            })
            .catch((err) => console.error(err));
        }}
      >
        <input
          id="oldPassword"
          type={"password"}
          placeholder={"old password"}
        ></input>
        <br />
        <input
          id="newPassword"
          type={"password"}
          placeholder={"new password"}
        ></input>
        <br />
        <input
          id="newPassword2"
          type={"password"}
          placeholder={"confirm new password"}
        ></input>
        <br />
        <button type="submit">Change Password</button>
      </form>
    </div>
  );
}
