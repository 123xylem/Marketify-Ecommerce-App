import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import api from "./api";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoutes";
import CssBaseline from "@mui/material/CssBaseline";
import NavigationMenu from "./components/NavigationMenu";
import Footer from "./components/Footer";
import ProductDetail from "./pages/ProductDetailPage";
import "./assets/styles/index.css";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
function Logout() {
  localStorage.removeItem("access-token");
  localStorage.removeItem("refresh-token");
  return <Navigate to="/login" element={<Login />} />;
}

function App() {
  const [count, setCount] = useState(0);
  const [footerText, setFooterText] = useState({});
  useEffect(() => {
    const fetchFooterContent = async () => {
      const url = "site-content/footer-disclaimer";
      try {
        const data = await api.get(url);
        if (data) {
          setFooterText(data.data.content);
        }
      } catch (err) {
        console.log("err geting content", err);
      }
    };
    fetchFooterContent();
  }, []);

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
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/register" element={<Register />} />

          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer content={footerText} />
      </BrowserRouter>
    </>
  );
}

export default App;
