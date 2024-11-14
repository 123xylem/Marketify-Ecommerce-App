/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import api from "../api";
import OrderList from "../components/order/OrderList";
import { ResponseMessage } from "../components/ResponseMessage";
const ProfilePage = () => {
  const [loading, setLoading] = useState(true);
  const [sucessMsg, setSuccessMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [userData, setUserData] = useState(null);
  // const [orderData, setOrderData] = useState(null);
  const [recievedData, setReceivedData] = useState(null);

  // let bodyContent = JSON.stringify({
  //   access: localStorage.getItem("access-token"),
  // });
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get(
          "/accountprofile/profile?page=1"
          // bodyContent,
        );
        if (!response.status) {
          throw new Error("Network response was not ok");
        }
        const data = await response.data;
        // data.password = "****";
        // data.password2 = "****";
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
      let bodyContent = {
        username: userData.username,
        email: userData.email,
        address: userData.address,
        // password: userData.password,
        // password2: userData.password2,
      };
      const response = await api.put(
        "/accountprofile/profile/update/",
        bodyContent
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
      if (err.response && err.response.data.error.includes("username")) {
        errMessage += " Username must be unique";
        customErr = true;
      }
      if (err.response && err.response.data.error.includes("email")) {
        errMessage += " Email must be unique and valid";
        customErr = true;
      } else if (!customErr) {
        // errMessage = err.response.data.error;
        errMessage = err.response;
      }
      setErrorMsg(errMessage);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  return (
    <div className="flex flex-wrap gap-4">
      <div className="w-full">
        <ResponseMessage message={sucessMsg} err={errorMsg}></ResponseMessage>
      </div>

      <form
        className="flex flex-col bg-gray-200 gap-4 p-4 max-w-min justify-start"
        onSubmit={(e) => editUserData(e)}
      >
        <div className="flex justify-start flex-col min-w-[250px]">
          <label className="p-1 pl-0 font-semibold">Username:</label>
          <input
            type="text"
            value={userData.username}
            name="username"
            onChange={(e) => handleChange(e)}
            className="bg-white p-1 rounded "
          />
        </div>
        <div className="flex justify-start flex-col min-w-[250px]">
          <label className="p-1 pl-0 font-semibold ">Email:</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={(e) => handleChange(e)}
            className="bg-white p-1 rounded "
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

        <div className="flex justify-start flex-col min-w-[250px]">
          <label className="p-1 pl-0 font-semibold">Address:</label>
          <textarea
            type="text"
            name="address"
            value={userData.address}
            onChange={(e) => handleChange(e)}
            className="bg-white p-1 rounded"
          />
        </div>
        <button
          className="bg-green-900 rounded font-bold text-white p-2"
          type="submit"
        >
          Edit Profile
        </button>
      </form>
      <OrderList />
    </div>
  );
};

export default ProfilePage;
