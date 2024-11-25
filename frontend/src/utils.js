import api from "./api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "./constants";

export function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

export function truncateString(string, len) {
  if (string.length >= len) {
    return `${string.slice(0, len)}...`;
  }
  return string;
}

// Exporting refreshToken for use in Axios interceptor
export const refreshToken = async () => {
  const refreshToken = localStorage.getItem(REFRESH_TOKEN);
  try {
    const res = await api.post("accountprofile/token/refresh/", {
      refresh: refreshToken,
    });

    if (res.status === 200) {
      localStorage.setItem(ACCESS_TOKEN, res.data.access);
      return res.data.access; // Return the new access token
    } else {
      throw new Error("Failed to refresh token");
    }
  } catch (err) {
    console.log(err);
    throw err; // Rethrow the error to handle it in the interceptor
  }
};

export const redirectToCartIfCartItem = async () => {
  const cartItem = localStorage.getItem("cartItem");
  const token = localStorage.getItem(ACCESS_TOKEN);
  if (!cartItem || !token) {
    window.location.href = "/";
  } else {
    try {
      const url = `cart/add/${cartItem}/`;
      const response = await api.post(url, {
        body: JSON.stringify({
          product_id: cartItem,
        }),
      });
      if (response) {
        if (response.status === 200) {
          localStorage.removeItem("cartItem");
          window.location.href = "/cart";
        }
      } else {
        window.location.href = "/";
        console.error("Failed to update item", response.data);
      }
    } catch (error) {
      console.log(error, "err");
      if (error.status === 401) {
        console.log("Error Redirecting to cart");
        window.location.href = "/";
      }
    }
  }
};
