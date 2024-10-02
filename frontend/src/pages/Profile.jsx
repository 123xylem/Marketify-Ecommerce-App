import React, { useEffect, useState } from "react";
// import { DataGrid } from "@mui/x-data-grid";
import api from "../api";
import OrderList from "../components/OrderList";

const ProfilePage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  let headersList = {
    Accept: "*/*",
    "Content-Type": "application/json",
  };

  let bodyContent = JSON.stringify({
    access: localStorage.getItem("access-token"),
  });
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get("/accountprofile/profile", bodyContent, {
          headers: headersList,
        });
        if (!response.status) {
          throw new Error("Network response was not ok");
        }
        const data = await response.data;
        console.log(data, "from profile");
        setUserData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    console.log(e);
    const { name, value } = e.target;
    console.log("n", name, "v:", value);
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log("changed: ", userData);
  };

  const editUserData = async () => {
    try {
      bodyContent = {
        // data: {
        username: userData.username,
        email: userData.email,
        // password: userData.password,
        address: userData.address,
        // },
      };
      console.log(bodyContent, "aa");
      const response = await api.put(
        "/accountprofile/profile/update/",
        bodyContent,
        {
          headers: headersList,
        }
      );
      if (!response.status) {
        throw new Error("Network response was not ok");
      }
      const data = await response.data;
      console.log("resData:", data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    newPassword: "",
    address: "",
    // product_list: [],
  });

  // const [username, setUsername] = useState(userData.username);
  // const [email, setEmail] = useState(userData.email);
  // const [password, setPassword] = useState(userData.password);
  // const [newPassword, setNewPassword] = useState("");
  // const [address, setAddress] = useState(userData.address);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <form>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={userData.username}
            name="username"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={"****"}
            onChange={(e) => handleChange(e)}
            readOnly
          />
        </div>
        <div>
          <label>New Password:</label>
          <input
            type="password"
            name="password2"
            value={"****"}
            onChange={(e) => handleChange(e)}
            readOnly
          />
        </div>

        <div>
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={userData.address}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <button type="button" onClick={editUserData}>
          Edit
        </button>
      </form>

      <OrderList data={userData.orders} />
    </>
  );
};

export default ProfilePage;
