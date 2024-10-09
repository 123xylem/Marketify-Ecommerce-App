/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import api from "../api";
import CheckoutPage from "./CheckoutPage";
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
      console.error(e, "error editing cart");
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
      <div className="cart-section">
        <h1>Welcome to your cart . {username}</h1>
        {cartData.cart.length > 0 ? (
          <div className="grid-box product-list">
            {cartData.cart.map((product) => (
              <div className="product grid-item" key={product.id}>
                <h3>{product.title}</h3>
                <img src={product.image} alt={product.image}></img>
                <p>${product.price}</p>
                <p>
                  {product.category
                    ?.filter((x) => x != [])
                    .map((cat) => (
                      <span key={cat.id}>{cat.title}, </span>
                    ))}
                </p>
                <button
                  className="remove-product"
                  value={product.id}
                  onClick={handleChange}
                >
                  Remove Product
                </button>
                <p>Quantity: {product.quantity}</p>
              </div>
            ))}
            <Link to="/checkout" state={{ cartData: cartData }}>
              Checkout
            </Link>
          </div>
        ) : (
          "No products in cart"
        )}
      </div>
    </>
  );
};

export default CartPage;
