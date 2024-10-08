/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import api from "../api";
import OrderPage from "./OrderPage";
import { ResponseMessage } from "../components/ResponseMessage";
import { Link } from "react-router-dom";

const CartPage = () => {
  const [loading, setLoading] = useState(true);
  const [sucessMsg, setSuccessMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [cartData, setCartData] = useState({});
  const username = localStorage.getItem("username").toUpperCase();
  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await api.get(`/cart/`, {});
        if (!response.status) {
          throw new Error("Network response was not ok");
        }
        const data = await response.data;
        console.log(data);
        setCartData(data);
      } catch (err) {
        setErrorMsg(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCartData();
  }, []);

  const handleChange = async (e) => {
    const productId = e.target.value;
    try {
      const changedData = await editCartData(productId);
      console.log(changedData, "post Edit");
    } catch (e) {
      console.error(e, "Shit fkd up");
    }
  };

  const editCartData = async (productId) => {
    setErrorMsg(null);
    setSuccessMsg(null);
    try {
      const url = `cart/remove/${productId}/`;
      const response = await api.post(url);
      if (!response.status) {
        throw new Error("Network response was not ok");
      }
      setSuccessMsg("Cart Updated");
      console.log(response.data.cart, "UPDATEDDDD");
      setCartData({
        ...cartData,
        cart: response.data.cart,
      });
      return response.data.cart;
    } catch (err) {
      let errMessage = "";
      let customErr = false;
      if (!customErr) {
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
      <div className="order-section">
        <h1>Welcome to your cart . {username}</h1>
      </div>
    </>
  );
};

export default CartPage;
