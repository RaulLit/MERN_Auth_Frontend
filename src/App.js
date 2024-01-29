import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Dashboard } from "./Components/Dashboard";
import { Login } from "./Components/Login";
import { Signup } from "./Components/Signup";
import { Layout } from "./Components/Layout";
import { useContext } from "react";
import { AuthContext } from "./Context/AuthContext";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <div className="App">
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={user ? <Dashboard /> : <Navigate to="/login" />} />
            <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
            <Route path="/signup" element={user ? <Navigate to="/" /> : <Signup />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
