import { createContext, useEffect, useReducer } from "react";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { user: null });

  const isAuth = async () => {
    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/isLoggedIn`, {
      credentials: "include",
    });
    const json = await response.json();
    if (json.status && json.status === "error") {
      dispatch({ type: "LOGOUT" });
    } else {
      dispatch({ type: "LOGIN", payload: json.name });
    }
  };

  useEffect(() => {
    isAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>{children}</AuthContext.Provider>
  );
};
