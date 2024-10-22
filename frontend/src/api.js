import axios from "axios";
import { ACCESS_TOKEN } from "./constants";
import { getCookie } from "./utlils";

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

export default api;
