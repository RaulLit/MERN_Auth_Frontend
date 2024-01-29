import { useNavigate } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

export const Layout = ({ children }) => {
  const { logout } = useLogout();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="layout">
      <div className="nav">
        {user ? (
          <button onClick={handleLogout}>Login Out</button>
        ) : (
          <>
            <button onClick={() => navigate("/login")}>Login</button>
            <button onClick={() => navigate("/signup")}>Signup</button>
          </>
        )}
      </div>
      {children}
    </div>
  );
};
