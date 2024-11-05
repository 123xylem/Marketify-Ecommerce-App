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
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProductDetail from "./pages/ProductDetailPage";
import "./assets/styles/index.css";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import SearchPage from "./pages/SearchPage";
import CategoryPage from "./pages/CategoryPage";
function Logout() {
  localStorage.removeItem("access-token");
  localStorage.removeItem("refresh-token");
  localStorage.removeItem("username");
  return <Navigate to="/login" element={<Login />} />;
}

function App() {
  const [count, setCount] = useState(0);
  const [footerText, setFooterText] = useState({});
  const [categories, setCategories] = useState([]);

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
    const getCategories = async () => {
      const url = "/category/";
      try {
        const res = await api.get(url);
        if (res.status == 200) {
          setCategories(res.data);
          console.log(res.data);
        }
      } catch (err) {
        console.log(err, " getting categories");
      }
    };
    getCategories();
  }, []);

  return (
    <>
      <BrowserRouter>
        <CssBaseline />
        <Header random={false} categories={categories} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/product/:slug" element={<ProductDetail />} />
          <Route path="/products/category/:slug" element={<CategoryPage />} />
          <Route path="/search-results/" element={<SearchPage />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile props />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <CartPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <CheckoutPage />
              </ProtectedRoute>
            }
          />

          <Route path="/register" element={<Register />} />

          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer content={footerText} categories={categories} />
      </BrowserRouter>
    </>
  );
}

export default App;
