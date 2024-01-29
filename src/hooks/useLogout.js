import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

export const useLogout = () => {
  const { dispatch } = useContext(AuthContext);

  const logout = async () => {
    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/logout`, {
      credentials: "include",
    });
    const json = await response.json();
    if (json.logout) {
      // dispatch logout action
      dispatch({ type: "LOGOUT" });
    } else alert("Something went wrong. Try again");
  };

  return { logout };
};
