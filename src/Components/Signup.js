import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSignup } from "../hooks/useSignup";

export const Signup = () => {
  const { signupUser, error, isLoading } = useSignup();

  // Schema
  const schema = yup.object().shape({
    name: yup.string().min(2).required(),
    email: yup.string().email("Invalid Email!").required("Email is required!"),
    password: yup.string().min(4).max(20).required(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Password don't match!")
      .required(),
  });

  // useForm
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleSignup = async ({ name, email, password }) => {
    await signupUser({ name, email, password });
  };

  return (
    <div className="signuppage">
      <form onSubmit={handleSubmit(handleSignup)}>
        <input type="text" placeholder="Name" {...register("name")} />
        <input type="text" placeholder="Email" {...register("email")} />
        <input type="password" placeholder="Password" {...register("password")} />
        <input
          type="password"
          placeholder="Confirm password"
          {...register("confirmPassword")}
        />
        <input type="submit" disabled={isLoading} />
      </form>
      <div className="errors">
        {error && <p>{error}</p>}
        {errors && errors.name && <p>{errors.name.message}</p>}
        {errors && errors.email && <p>{errors.email.message}</p>}
        {errors && errors.password && <p>{errors.password.message}</p>}
        {errors && errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
      </div>
    </div>
  );
};
