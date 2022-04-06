import ChangePassword from "./ChangePassword";
import Favorites from "./Favorites";
import SearchHistory from "./SearchHistory";

export default function Profile(props: {
  setToken: CallableFunction;
  token: string;
}) {
  return (
    <div>
      <ChangePassword setToken={props.setToken} />
      <hr></hr>
      <SearchHistory token={props.token} />
      <Favorites token={props.token} />
    </div>
  );
}
