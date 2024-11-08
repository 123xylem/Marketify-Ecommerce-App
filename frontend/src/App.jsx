import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import api from "./api";
import Login from "./pages/LoginPage";
import Register from "./pages/RegisterPage";
import Home from "./pages/HomePage";
import NotFound from "./pages/NotFoundPage";
import Profile from "./pages/ProfilePage";
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
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { QueryClient } from "@tanstack/react-query";
import { lazy, Suspense } from "react";

// const Login = lazy(() => import("./pages/LoginPage"));
// const Register = lazy(() => import("./pages/RegisterPage"));
// // const Home = lazy(() => import("./pages/HomePage"));
// const Profile = lazy(() => import("./pages/ProfilePage"));
// const ProductDetail = lazy(() => import("./pages/ProductDetailPage"));
// const CartPage = lazy(() => import("./pages/CartPage"));
// const CategoryPage = lazy(() => import("./pages/CategoryPage"));
// const CheckoutPage = lazy(() => import("./pages/CheckoutPage"));
// const SearchPage = lazy(() => import("./pages/SearchPage"));
// const NotFound = lazy(() => import("./pages/NotFoundPage"));
// const ProtectedRoute = lazy(() => import("./components/ProtectedRoutes"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24,
    },
  },
});

const localStoragePersister = createSyncStoragePersister({
  storage: window.localStorage,
});

const persistOptions = {
  persister: localStoragePersister,
  dehydrateOptions: {
    shouldDehydrateQuery: (query) => query.meta?.persist === true,
  },
};

function Logout() {
  localStorage.removeItem("access-token");
  localStorage.removeItem("refresh-token");
  localStorage.removeItem("username");
  localStorage.removeItem("userID");
  return <Navigate to="/login" element={<Login />} />;
}

function App() {
  return (
    <PersistQueryClientProvider
      persistOptions={persistOptions}
      client={queryClient}
    >
      <ReactQueryDevtools initialIsOpen={false} />

      <BrowserRouter>
        <CssBaseline />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/products/product/:slug"
            element={
              <ProductDetail />

              // <Suspense fallback={<div>Loading...</div>}>
              // </Suspense>
            }
          />

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
          {/* </Suspense> */}
        </Routes>

        <Footer />
      </BrowserRouter>
    </PersistQueryClientProvider>
  );
}

export default App;
