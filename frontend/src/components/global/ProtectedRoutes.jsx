/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { ACCESS_TOKEN } from "../../constants";
import { useState, useEffect } from "react";
import { refreshToken } from "../../utils";

const ProtectedRoute = ({ children }) => {
  const [isAuthorized, setisAuthorized] = useState(null);

  useEffect(() => {
    auth().catch((err) => {
      console.log(err, "caught in auth");
      setisAuthorized(false);
      window.location.href = "/products?loggedin=YouNeedToBe"; // Redirect if auth fails
    });
  }, []);

  const auth = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
      setisAuthorized(false);
      return;
    }
    const decoded = jwtDecode(token);
    const tokenExpiration = decoded.exp;
    const now = Date.now() / 1000;

    if (tokenExpiration && tokenExpiration < now) {
      console.log("REFRESHING TOKEN");
      const newAccessToken = await refreshToken();
      if (newAccessToken) {
        setisAuthorized(true);
      } else {
        setisAuthorized(false);
      }
    } else {
      setisAuthorized(true);
    }
  };

  if (isAuthorized === null) {
    return <div>Loading...</div>;
  }

  return isAuthorized ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
