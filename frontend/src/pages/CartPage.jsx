/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import api from "../api";
import { ResponseMessage } from "../components/ResponseMessage";
import { loadStripe } from "@stripe/stripe-js";
import ProductCard from "../components/product/ProductCard";

const CartPage = () => {
  const [loading, setLoading] = useState(true);
  const [sucessMsg, setSuccessMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [cartData, setCartData] = useState({});
  const username = localStorage.getItem("username").toUpperCase();
  const [createdCheckoutSession, setCreatedCheckoutSession] = useState(false);

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await api.get(`/cart/`);
        if (!response.status) {
          throw new Error("Network response was not ok");
        }
        const data = await response.data;
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
    const productId = e.target.value.split(",")[0];
    const action = e.target.value.split(",")[1];
    console.log(productId, action, e.target.value, "a");
    try {
      const changedData = await editCartData(productId, action);
      console.log(changedData, "post Edit");
    } catch (e) {
      console.error(e, "error editing cart");
    }
  };

  const editCartData = async (productId, action) => {
    setErrorMsg(null);
    setSuccessMsg(null);
    try {
      const url = `cart/${action}/${productId}/?cart-update=true`;
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

  const handleCheckout = async () => {
    if (!cartData) {
      alert("no cart", cartData);
    }
    const createCheckoutSession = async (cartItems) => {
      const response = await api
        .post("/orders/stripe/create-checkout-session/", {
          cartItems: cartItems,
        })
        .catch((err) => {
          console.log(err, "is stripey err");
        });
      if (response.status == 200) {
        const sessionId = response.data.id;
        setCreatedCheckoutSession(true);
        redirectToStripeCheckoutForm(sessionId);
      }
    };

    const redirectToStripeCheckoutForm = async (sessionId) => {
      const stripe = await loadStripe(
        "pk_test_51QCJEBJaXhjxvppmUCtv0TzkMQckbyRUB0CLKQIcHQryb0TPMFn2jv6fNI8QKU7e9eROVENS9pNd4mVhHFZ430Oo00wnl03SB8"
      );
      const stripeResponse = await stripe.redirectToCheckout({
        sessionId,
      });
      if (stripeResponse.error) {
        alert(stripeResponse.error.message);
      }
    };

    if (cartData.cart && cartData.cart.length > 0) {
      console.log("CREATING NEW SESSION", createdCheckoutSession);
      createCheckoutSession(cartData.cart);
    }
  };

  if (loading) return <div>Loading...</div>;
  return (
    <>
      <ResponseMessage message={sucessMsg} err={errorMsg}></ResponseMessage>
      <div className="cart-section">
        <h1 className="font-bold text-xl pb-4">
          Here is your cart {username.toLowerCase()}
        </h1>
        {cartData.cart && cartData.cart.length > 0 ? (
          <div className="justify-center sm:justify-start flex flex-wrap gap-4 product-list">
            {cartData.cart.map((product) => (
              <div
                className="cart-item flex-1 max-w-[260px] sm:min-w-[250px]"
                key={product.id}
              >
                <ProductCard
                  key={product.id}
                  item={product}
                  cartItem={{
                    btnHandler: handleChange,
                    id: product.id,
                    quantity: product.quantity,
                  }}
                />
              </div>
            ))}
            <div className="checkout-div min-w-full">
              <button
                className="bg-green-900 font-bold text-white p-4 mb-auto hover:underline"
                onClick={handleCheckout}
              >
                Checkout
              </button>
            </div>
          </div>
        ) : (
          "No products in cart"
        )}
      </div>
    </>
  );
};

export default CartPage;
