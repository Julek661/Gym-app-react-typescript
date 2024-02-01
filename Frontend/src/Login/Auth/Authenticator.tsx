import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { LOGIN } from "../../Queries/Queries";
import { useLazyQuery } from "@apollo/client";
import { UserContext } from "../../App";
interface LoginDetails {
  Email: string;
  Password: string;
}

export default function Authenticator({
  setLoggedIn,
}: {
  setLoggedIn: React.Dispatch<React.SetStateAction<string>>;
}) {
  const { register, handleSubmit } = useForm<LoginDetails>();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [login, { data = { LOGIN: [] }, error }] = useLazyQuery(LOGIN, {
    fetchPolicy: "network-only",
  });

  const loggedIn = useContext(UserContext);
  console.log(Boolean(loggedIn));
  // useeffect used because The login function is asynchronous, which means it returns a Promise that resolves after the network request is complete.
  useEffect(() => {
    if (error) {
      setErrorMessage(error.message);
    } else if (data?.login) {
      setLoggedIn(data?.login.user_id);
      alert("Logged in!");
      setErrorMessage(""); // reset error message
    }
  }, [error, data, setLoggedIn]);

  return (
    <div>
      {Boolean(loggedIn) ? (
        <>
          <h1>Welcome</h1>
          <button
            onClick={() => {
              setLoggedIn("");
            }}
          >
            Logout
          </button>
        </>
      ) : (
        <form
          onSubmit={handleSubmit((data) => {
            login({
              variables: {
                email: data.Email,
                password: data.Password,
              },
            });
          })}
        >
          <h1>Login</h1>
          <h2>Email</h2>
          <input {...register("Email", { required: true })} />
          <h2>Password</h2>
          <input
            {...register("Password", { required: true })}
            type="password"
          />
          <button>Login</button>
          {errorMessage && errorMessage}
        </form>
      )}
    </div>
  );
}
