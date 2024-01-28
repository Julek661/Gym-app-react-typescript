import React from "react";
import CreateAccount from "./Create Account/CreateAccount";
import Authenticator from "./Auth/Authenticator";

export default function Login() {
  const [login, setLogin] = React.useState<boolean>(true);
  return (
    <div>
      {login ? <Authenticator /> : <CreateAccount />}
      {login ? (
        <button onClick={() => setLogin(false)}>Create Account</button>
      ) : (
        <button onClick={() => setLogin(true)}>Login</button>
      )}
    </div>
  );
}
