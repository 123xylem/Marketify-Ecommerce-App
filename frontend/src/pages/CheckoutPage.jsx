/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import api from "../api";
import { ResponseMessage } from "../components/ResponseMessage";
import { Link, useLocation } from "react-router-dom";
import PayShippingForm from "../components/forms/PayShippingForm";

const CheckoutPage = () => {
  const [loading, setLoading] = useState(true);
  const [sucessMsg, setSuccessMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [orderData, setOrderData] = useState({});
  const location = useLocation();
  const { cartData } = location.state;

  const calculateTotal = (cartData) => {
    let total = 0;
    cartData.cart.map((prod) => {
      total += prod.price * prod.quantity;
    });
    return total;
  };

  const username = localStorage.getItem("username").toUpperCase();
  useEffect(() => {
    const createOrder = async () => {
      try {
        console.log(cartData, "items");
        const prodIds = [];
        cartData.cart.map((prod) => {
          prodIds.push({ id: prod.product_id, quantity: prod.quantity });
        });
        const response = await api.post(`/orders/`, { prodIds });
        if (!response.status) {
          throw new Error("Network response was not ok");
        }
        const data = await response.data;
        console.log(data, "parsed");
        setOrderData(data);
      } catch (err) {
        setErrorMsg(err.message);
      } finally {
        setLoading(false);
      }
    };

    createOrder();
  }, [cartData]);

  if (loading) return <div>Loading...</div>;
  return (
    <>
      <ResponseMessage
        className={sucessMsg ? "success" : "error"}
        message={sucessMsg}
        err={errorMsg}
      ></ResponseMessage>
      <div className="order-section">
        <h1>Welcome to your Order . {username}</h1>

        {cartData.cart.length > 0 ? (
          <div className="grid-box order-list">
            {cartData.cart.map((product) => (
              <div className="product grid-item" key={product.id}>
                <h3>{product.title}</h3>
                <p>${product.price}</p>
                <p>Quantity: {product.quantity}</p>
              </div>
            ))}
            <h3>Total: {calculateTotal(cartData)} </h3>
          </div>
        ) : (
          ""
        )}
        <PayShippingForm />
      </div>
    </>
  );
};

export default CheckoutPage;
