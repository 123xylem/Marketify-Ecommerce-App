// /* eslint-disable react/prop-types */
// import { Navigate } from "react-router-dom";
// import { jwtDecode } from "jwt-decode";
// import api from "../api";
// import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
// import { useState, useEffect } from "react";

// function ProtectedRoute({ children }) {
//   const [isAuthorized, setisAuthorized] = useState(null);

//   useEffect(() => {
//     auth().catch((err) => {
//       console.log(err, "caught in auth");
//       setisAuthorized(false);
//       window.location.href = "/products";
//     });
//   }, []);

//   const refreshToken = async () => {
//     const refreshToken = localStorage.getItem(REFRESH_TOKEN);
//     try {
//       const res = await api.post("accountprofile/token/refresh/", {
//         refresh: refreshToken,
//       });

//       if (res.status === 200) {
//         localStorage.setItem(ACCESS_TOKEN, res.data.access);
//         setisAuthorized(true);
//       } else {
//         setisAuthorized(false);
//       }
//     } catch (err) {
//       console.log(err);
//       setisAuthorized(false);
//     }
//   };

//    const auth = async () => {
//     const token = localStorage.getItem(ACCESS_TOKEN);
//     if (!token) {
//       setisAuthorized(false);
//       return;
//     }
//     const decoded = jwtDecode(token);
//     const tokenExpiration = decoded.exp;
//     const now = Date.now() / 1000;

//     if (tokenExpiration && tokenExpiration < now) {
//       console.log("REFRESHING TOKEN");
//       await refreshToken();
//     } else {
//       setisAuthorized(true);
//     }
//   };

//   if (isAuthorized === null) {
//     return <div>Loading...</div>;
//   }

//   return isAuthorized ? children : <Navigate to="/login" />;
// }

// export default ProtectedRoute;

/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { useState, useEffect } from "react";

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
