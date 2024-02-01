import React, { SetStateAction } from "react";
import CreateAccount from "./Create Account/CreateAccount";
import Authenticator from "./Auth/Authenticator";

export default function Login({
  setLoggedIn,
}: {
  setLoggedIn: React.Dispatch<SetStateAction<string>>;
}) {
  const [login, setLogin] = React.useState<boolean>(true);
  return (
    <div>
      {login ? <Authenticator setLoggedIn={setLoggedIn} /> : <CreateAccount />}
      {login ? (
        <button onClick={() => setLogin(false)}>Create Account</button>
      ) : (
        <button onClick={() => setLogin(true)}>Login</button>
      )}
    </div>
  );
}
