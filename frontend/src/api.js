import axios from "axios";
import { ACCESS_TOKEN } from "./constants";
import { getCookie } from "./utils";
import { refreshToken } from "./utils";

//Temp hardcode api as .env vars are saved to a cache
const api = axios.create({
  // baseURL: import.meta.env.VITE_BACKEND_URL,
  baseURL: "http://192.168.1.102:8000/api/",
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
    // alert(error, JSON.stringify(error));
    if (!localStorage.getItem("refresh-token")) {
      console.error(error, "User has no JWT");
      return Promise.reject(error);
    }
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Call your refresh token endpoint
        console.log(error, "EXPIRED access TOKEN??, Attempting to refresh it");
        const accessToken = await refreshToken(); // Update the original request's authorization header
        originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;

        // Retry the original request with the new token
        return api(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed", refreshError);

        return Promise.reject(refreshError);
      }
    }
  }
);

export default api;
