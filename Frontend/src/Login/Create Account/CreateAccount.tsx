import React from "react";
import "./CreateAccount.scss";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../../Mutations/Mutations";

interface CreateAccountDetails {
  Email: string;
  Password: string;
  Confirm_Password: string;
  First_Name: string;
  Last_Name: string;
}
interface CreateUser {
  createUser: CreateAccountDetails;
}

export default function CreateAccount() {
  const { register, handleSubmit, reset } = useForm<CreateAccountDetails>();
  const [createComponent] = useMutation<CreateUser>(CREATE_USER);

  return (
    <div className="CreateAccount">
      <form
        onSubmit={handleSubmit(async (data) => {
          const { Email, Password, Confirm_Password, First_Name, Last_Name } =
            data;
          if (Password !== Confirm_Password) {
            alert("Passwords do not match");
          } else {
            try {
              const { data } = await createComponent({
                variables: {
                  email: Email,
                  password: Password,
                  first_name: First_Name,
                  last_name: Last_Name,
                },
              });
              if (data && data?.createUser) {
                alert("Account Created !");
                reset();
              }
            } catch (error: any) {
              console.error("Error creating account:", error.message);
            }
          }
        })}
      >
        <h1>Create Account</h1>
        <h2>Email</h2>
        <input {...register("Email", { required: true })} />
        <h2>Password</h2>
        <input type="password" {...register("Password", { required: true })} />
        <h2>Confirm Password</h2>
        <input
          type="password"
          {...register("Confirm_Password", { required: true })}
        />
        <h2>First Name</h2>
        <input {...register("First_Name", { required: true })} />
        <h2>Last Name</h2>
        <input {...register("Last_Name", { required: true })} />
        <button>Create Account</button>
      </form>
    </div>
  );
}
