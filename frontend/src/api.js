import axios from "axios";
import { ACCESS_TOKEN } from "./constants";
import { getCookie } from "./utlils";
import { refreshToken } from "./components/protectedRoutes";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {
    Accept: "*/*",
    "Content-Type": "application/json",
  },
  credentials: "include",
});

api.interceptors.request.use(
  (config) => {
    const csrfToken = getCookie("csrftoken");
    if (["post", "put", "delete"].includes(config.method) && csrfToken) {
      config.headers["X-CSRFToken"] = csrfToken;
    }
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  async (response) => response,
  async (error) => {
    console.log("EXPIRED TOKEN, REFRESHING");
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Call your refresh token endpoint

        const accessToken = await refreshToken(); // Update the original request's authorization header
        originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;

        // Retry the original request with the new token
        return api(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed", refreshError);
        // Optionally, redirect to login or handle as needed
        return Promise.reject(refreshError);
      }
    }
  }
);

export default api;
