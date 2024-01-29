import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const loginUser = async (email, password) => {
    setError(null);
    setIsLoading(true);

    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });

    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }

    if (response.ok) {
      // update the auth context
      dispatch({ type: "LOGIN", payload: json.name });
      setIsLoading(false);
      navigate("/");
    }
  };

  return { loginUser, isLoading, error };
};
