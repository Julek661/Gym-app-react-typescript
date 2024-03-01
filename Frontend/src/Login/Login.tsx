import React, { SetStateAction } from "react";
import CreateAccount from "./Create Account/CreateAccount";
import Authenticator from "./Auth/Authenticator";
import { UserContext } from "../App";

export default function Login({
  setLoggedIn,
}: Readonly<{
  setLoggedIn: React.Dispatch<SetStateAction<string>>;
}>) {
  const loggedIn = React.useContext<string>(UserContext);
  const [login, setLogin] = React.useState<boolean>(true);

  return (
    <div>
      {login ? <Authenticator setLoggedIn={setLoggedIn} /> : <CreateAccount />}
      {!loggedIn &&
        (login ? (
          <button onClick={() => setLogin(false)}>Create Account</button>
        ) : (
          <button onClick={() => setLogin(true)}>Login</button>
        ))}
    </div>
  );
}
