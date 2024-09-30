import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Account from "./pages/Account";
import ProtectedRoute from "./components/protectedRoutes";
import CssBaseline from "@mui/material/CssBaseline";
import NavigationMenu from "./components/NavigationMenu";

function LogOut() {
  localStorage.clear();
  return <Navigate to="/login" />;
}

function RegisterAndLogout() {
  localStorage.clear();
  return <Register />;
}
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {" "}
      <BrowserRouter>
        <CssBaseline />
        <NavigationMenu />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/api/accountprofile/account"
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* //Fallback for anything else  */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
