/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
// TODO: password reset with email?
// TODO: add avatar image
import api from "../api";
import OrderList from "../components/OrderList";
import { ResponseMessage } from "../components/ResponseMessage";
const ProfilePage = () => {
  const [loading, setLoading] = useState(true);
  const [sucessMsg, setSuccessMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [userData, setUserData] = useState(null);
  const [recievedData, setReceivedData] = useState(null);

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
        data.password = "****";
        data.password2 = "****";
        // console.log(data, "from profile");
        setUserData(data);
        setReceivedData(data);
      } catch (err) {
        setErrorMsg(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const editUserData = async (e) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (JSON.stringify(userData) === JSON.stringify(recievedData)) {
      setErrorMsg("No changes detected");
      return;
    }
    try {
      bodyContent = {
        username: userData.username,
        email: userData.email,
        address: userData.address,
        // password: userData.password,
        // password2: userData.password2,
      };
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
      setSuccessMsg("Profile Updated");
      setReceivedData((prevData) => ({
        ...prevData,
        ...bodyContent,
      }));
    } catch (err) {
      let errMessage = "";
      let customErr = false;
      if (err.response.data.error.includes("username")) {
        errMessage += " Username must be unique";
        customErr = true;
      }
      if (err.response.data.error.includes("email")) {
        errMessage += " Email must be unique and valid";
        customErr = true;
      } else if (!customErr) {
        errMessage = err.response.data.error;
      }
      setErrorMsg(errMessage);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  return (
    <>
      <ResponseMessage message={sucessMsg} err={errorMsg}></ResponseMessage>

      <form onSubmit={(e) => editUserData(e)}>
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
        {/* <div>
          <label>Old Password:</label>
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label>New Password:</label>
          <input
            type="password"
            name="password2"
            value={userData.password2}
            onChange={(e) => handleChange(e)}
          />
        </div> */}

        <div>
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={userData.address}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <button type="submit">Edit Profile</button>
      </form>
      <OrderList data={userData.orders} />
    </>
  );
};

export default ProfilePage;