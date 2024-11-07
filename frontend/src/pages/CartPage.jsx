/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import api from "../api";
import CheckoutPage from "./CheckoutPage";
import { ResponseMessage } from "../components/ResponseMessage";
import { Link } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { useQuery } from "@tanstack/react-query";

const CartPage = () => {
  const [loading, setLoading] = useState(true);
  const [sucessMsg, setSuccessMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [cartData, setCartData] = useState({});
  const username = localStorage.getItem("username").toUpperCase();
  const [createdCheckoutSession, setCreatedCheckoutSession] = useState(false);

  // const useCartData = () => {
  //   return useQuery(
  //     ["cartData"],
  //     async () => {
  //       const response = await api.get("/cart/");
  //       if (response.status < 200 || response.status >= 300) {
  //         throw new Error("Network response was not ok");
  //       }
  //       return response.data;
  //     },
  //     {
  //       staleTime: 0, // Data is always considered stale
  //       cacheTime: 0, // Disables caching completely
  //       refetchOnWindowFocus: true, // Optional: Fetch new data on window focus
  //       refetchInterval: false, // Prevent polling unless desired
  //     }
  //   );
  // };

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await api.get(`/cart/`);
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
  // const { data: cartData, isLoading, isError, error } = useCartData();

  const handleChange = async (e) => {
    const productId = e.target.value.split(",")[0];
    const action = e.target.value.split(",")[1];
    console.log(productId, action, e.target.value);
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
      const url = `cart/${action}/${productId}/`;
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
          console.log(err, "is stripey");
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
        <h1>Welcome to your cart . {username}</h1>
        {cartData.cart && cartData.cart.length > 0 ? (
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
                  value={[product.id, "remove"]}
                  onClick={handleChange}
                >
                  Remove Product
                </button>
                <button
                  className="add-product"
                  value={[product.id, "add"]}
                  onClick={handleChange}
                >
                  Add Product
                </button>

                <p>Quantity: {product.quantity}</p>
              </div>
            ))}
            <button onClick={handleCheckout}>Checkout</button>
          </div>
        ) : (
          "No products in cart"
        )}
      </div>
    </>
  );
};

export default CartPage;
