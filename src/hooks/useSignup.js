import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const signupUser = async (data) => {
    try {
      setError(null);
      setIsLoading(true);

      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });

      const json = await response.json();
      if (!response.ok) {
        throw Error(json.error);
      }

      if (response.ok) {
        // update the auth context
        dispatch({ type: "LOGIN", payload: json.name });
        navigate("/");
      }
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { signupUser, isLoading, error };
};
