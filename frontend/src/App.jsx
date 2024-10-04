import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/protectedRoutes";
import CssBaseline from "@mui/material/CssBaseline";
import NavigationMenu from "./components/NavigationMenu";
import ProductDetail from "./pages/ProductDetailPage";
import "./assets/styles/product.css";
function Logout() {
  localStorage.removeItem("access-token");
  localStorage.removeItem("refresh-token");
  return <Navigate to="/login" element={<Login />} />;
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
          <Route path="/products/product/:slug" element={<ProductDetail />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile props />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
