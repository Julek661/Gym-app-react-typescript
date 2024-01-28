import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { LOGIN } from "../../Queries/Queries";
import { useQuery } from "@apollo/client";
interface LoginDetails {
  Email: string;
  Password: string;
}
export default function Authenticator() {
  const [loginDetails, setLoginDetails] = useState<LoginDetails>();
  const { register, handleSubmit } = useForm<LoginDetails>();
  const { data = { LOGIN: [] }, refetch } = useQuery(LOGIN, {
    variables: {
      email: loginDetails?.Email,
      password: loginDetails?.Password,
    },
  });
  console.log(data);
  return (
    <div>
      <form
        onSubmit={handleSubmit((data) => {
          setLoginDetails(data);
          refetch();
        })}
      >
        <h1>Login</h1>
        <h2>Email</h2>
        <input {...register("Email", { required: true })} />
        <h2>Password</h2>
        <input {...register("Password", { required: true })} type="password" />
        <button>Login</button>
      </form>
    </div>
  );
}
