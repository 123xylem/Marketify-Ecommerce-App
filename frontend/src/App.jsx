import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Layout from "./components/global/Layout";
// import "./assets/styles/index.css";
import "../dist/styles/output.css";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { QueryClient } from "@tanstack/react-query";
import { lazy, Suspense } from "react";

const Login = lazy(() => import("./pages/LoginPage"));
const Register = lazy(() => import("./pages/RegisterPage"));
const Home = lazy(() => import("./pages/HomePage"));
const Profile = lazy(() => import("./pages/ProfilePage"));
const DetailPage = lazy(() => import("./pages/DetailPage"));
const CartPage = lazy(() => import("./pages/CartPage"));
const CategoryPage = lazy(() => import("./pages/CategoryPage"));
const CheckoutPage = lazy(() => import("./pages/CheckoutPage"));
const SearchPage = lazy(() => import("./pages/SearchPage"));
const NotFound = lazy(() => import("./pages/NotFoundPage"));
const ProtectedRoute = lazy(
  () => import("./components/global/ProtectedRoutes")
);
const ContactPage = lazy(() => import("./pages/ContactPage"));
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
        <Layout>
          <Routes>
            <Route
              path="/"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Home />
                </Suspense>
              }
            />
            <Route
              path="/products/product/:slug"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <DetailPage />
                </Suspense>
              }
            />

            <Route
              path="/products/category/:slug"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <CategoryPage />{" "}
                </Suspense>
              }
            />

            <Route
              path="/search-results/"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <SearchPage />{" "}
                </Suspense>
              }
            />
            <Route
              path="/profile"
              element={
                <Suspense>
                  {" "}
                  <ProtectedRoute>
                    <Profile props />
                  </ProtectedRoute>
                </Suspense>
              }
            />
            <Route
              path="/login"
              element={
                <Suspense>
                  {" "}
                  <Login />
                </Suspense>
              }
            />
            <Route
              path="/cart"
              element={
                <Suspense>
                  {" "}
                  <ProtectedRoute>
                    <CartPage />
                  </ProtectedRoute>
                </Suspense>
              }
            />

            <Route
              path="/checkout"
              element={
                <Suspense>
                  {" "}
                  <ProtectedRoute>
                    <CheckoutPage />
                  </ProtectedRoute>
                </Suspense>
              }
            />

            <Route
              path="/register"
              element={
                <Suspense>
                  {" "}
                  <Register />
                </Suspense>
              }
            />

            <Route
              path="/logout"
              element={
                <Suspense>
                  {" "}
                  <Logout />{" "}
                </Suspense>
              }
            />
            <Route
              path="/contact"
              element={
                <Suspense>
                  {" "}
                  <ContactPage />{" "}
                </Suspense>
              }
            />
            <Route
              path="*"
              element={
                <Suspense>
                  {" "}
                  <NotFound />
                </Suspense>
              }
            />
            {/* </Suspense> */}
          </Routes>
        </Layout>
      </BrowserRouter>
    </PersistQueryClientProvider>
  );
}

export default App;
