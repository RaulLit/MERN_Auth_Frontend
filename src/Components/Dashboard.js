import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

export const Dashboard = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="dashboardpage">
      <h1>Welcome back {user}</h1>
      <h2>This is a Dashboard</h2>
    </div>
  );
};
