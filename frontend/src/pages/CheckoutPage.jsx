// /* eslint-disable react/prop-types */
// import { useEffect, useState } from "react";
// import api from "../api";
// import { ResponseMessage } from "../components/ResponseMessage";
// import { Link, useLocation } from "react-router-dom";
// import PayShippingForm from "../components/forms/PayShippingForm";

// const CheckoutPage = () => {
//   const [loading, setLoading] = useState(true);
//   const [sucessMsg, setSuccessMsg] = useState(null);
//   const [errorMsg, setErrorMsg] = useState(null);
//   const [orderData, setOrderData] = useState({});
//   const location = useLocation();
//   const { cartData } = location.state;

//   const calculateTotal = (cartData) => {
//     let total = 0;
//     cartData.cart.map((prod) => {
//       total += prod.price * prod.quantity;
//     });
//     return total;
//   };

//   const username = localStorage.getItem("username").toUpperCase();
//   useEffect(() => {
//     const createOrder = async () => {
//       try {
//         console.log(cartData, "items");
//         const prodIds = [];
//         cartData.cart.map((prod) => {
//           prodIds.push({ id: prod.product_id, quantity: prod.quantity });
//         });
//         const response = await api.post(`/orders/`, { prodIds });
//         if (!response.status) {
//           throw new Error("Network response was not ok");
//         }
//         const data = await response.data;
//         console.log(data, "parsed");
//         setOrderData(data);
//       } catch (err) {
//         setErrorMsg(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     createOrder();
//   }, [cartData]);

//   if (loading) return <div>Loading...</div>;
//   return (
//     <>
//       <ResponseMessage
//         className={sucessMsg ? "success" : "error"}
//         message={sucessMsg}
//         err={errorMsg}
//       ></ResponseMessage>
//       <div className="order-section">
//         <h1>Welcome to your Order . {username}</h1>

//         {cartData.cart.length > 0 ? (
//           <div className="grid-box order-list">
//             {cartData.cart.map((product) => (
//               <div className="product grid-item" key={product.id}>
//                 <h3>{product.title}</h3>
//                 <p>${product.price}</p>
//                 <p>Quantity: {product.quantity}</p>
//               </div>
//             ))}
//             <h3>Total: {calculateTotal(cartData)} </h3>
//           </div>
//         ) : (
//           ""
//         )}
//         <PayShippingForm />
//       </div>
//     </>
//   );
// };

// export default CheckoutPage;
import { Link, useLocation, useParams } from "react-router-dom";
import { useCallback, useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import api from "../api";
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
// This test secret API key is a placeholder. Don't include personal details in requests with this key.
// To see your test secret API key embedded in code samples, sign in to your Stripe account.
// You can also find your test secret API key at https://dashboard.stripe.com/test/apikeys.
// const stripePromise = loadStripe("pk_test_qblFNYngBkEdjEZ16jxxoWSM");

//TODO RErender of stripe load?
// TODO Display success/ error only. create session handled on cart checkout click
//TODO Backend make order and send that data with success error to this page.
const CheckoutPage = () => {
  const location = useLocation();
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [createdCheckoutSession, setCreatedCheckoutSession] = useState(false);
  const { slug } = useParams();
  const { cartData } = location.state || { cartData: { cart: [] } };
  const cartItems = cartData.cart;

  useEffect(() => {
    if (window.location.search.includes("success")) {
      console.log(checkoutSuccess, "pre");
      setCheckoutSuccess(true);
    }
  }, [location.search]);

  useEffect(() => {
    if (!checkoutSuccess && !location.state) {
      alert("Invalid cart");
      window.location.href = "/cart"; // Redirect if conditions are met
    }
  }, [checkoutSuccess, location.state]);

  useEffect(() => {
    console.log("111111");

    // if (!checkoutSuccess && !location.state) {
    //   alert("invalid cart");
    //   window.location.href = "/cart";
    // }
    // console.log("22222");

    console.log("333");

    const createCheckoutSession = async (cartItems) => {
      console.log("444 inside func");

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
      console.log("555 inside func");

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
    console.log("666 pre");

    if (!createdCheckoutSession) {
      console.log("777 shouldnt call");

      console.log("CREATING NEW SESSION", createdCheckoutSession);
      createCheckoutSession(cartItems);
    }
  }),
    [];

  return (
    <div id="checkout">
      <h1>Hi</h1>
      {/* {
        checkoutSuccess
          ? "ORDER SUCCESS"
          : "" 
      } */}
    </div>
  );
};

export default CheckoutPage;
