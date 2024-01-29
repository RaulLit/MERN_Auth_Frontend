import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useLogin } from "../hooks/useLogin";

export const Login = () => {
  const { loginUser, isLoading, error } = useLogin();
  // Schema
  const schema = yup.object().shape({
    email: yup.string().email("Invalid Email!").required("Email is required!"),
    password: yup.string().min(4).max(20).required("Password is required!"),
  });

  // useForm
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleLogin = async ({ email, password }) => {
    await loginUser(email, password);
  };

  return (
    <div className="loginpage">
      <form onSubmit={handleSubmit(handleLogin)}>
        <input type="text" placeholder="email" {...register("email")} />
        <input type="password" placeholder="password" {...register("password")} />
        <input type="submit" disabled={isLoading} />
      </form>
      <div className="errors">
        {error && <p>{error}</p>}
        {errors && errors.email && <p>{errors.email.message}</p>}
        {errors && errors.password && <p>{errors.password.message}</p>}
      </div>
    </div>
  );
};
