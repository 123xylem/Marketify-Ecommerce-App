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
import { Link, useLocation } from "react-router-dom";
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

const CheckoutForm = () => {
  const location = useLocation();
  const handleCheckout = async () => {
    // Create a Checkout Session
    // return api.get("orders/create-checkout-session/");
    const { cartData } = location.state;
    console.log(cartData, "aa");
    const cartItems = cartData.cart;
    const response = await api
      .post("/orders/stripe/create-checkout-session/", {
        cartItems: cartItems,
      })
      .catch((err) => {
        console.log(err, "is stripey");
      });
    const sessionId = response.data.id;
    const stripe = await loadStripe(
      "pk_test_51QCJEBJaXhjxvppmUCtv0TzkMQckbyRUB0CLKQIcHQryb0TPMFn2jv6fNI8QKU7e9eROVENS9pNd4mVhHFZ430Oo00wnl03SB8"
    );
    await stripe.redirectToCheckout({ sessionId });

    // const stripeDetails = api
    //   .post(
    //     "/orders/stripe/create-checkout-session/",
    //     JSON.stringify({
    //       cartItems,
    //     })
    //   )
    //   .then((data) => {
    //     console.log("AAAA", data), data.id;
    //   })
    //   .catch((err) => {
    //     console.log(err, "is stripey");
    //   });
    // return stripeDetails;
  };

  // const options = { fetchClientSecret };

  return (
    <div id="checkout">
      {/* <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider> */}
      <button onClick={handleCheckout}>Checkout</button>
    </div>
  );
};

// const Return = () => {
//   const [status, setStatus] = useState(null);
//   const [customerEmail, setCustomerEmail] = useState("");

//   useEffect(() => {
//     const queryString = window.location.search;
//     const urlParams = new URLSearchParams(queryString);
//     const sessionId = urlParams.get("session_id");

//     api
//       .get(`/session-status?session_id=${sessionId}`)
//       .then((res) => res.json())
//       .then((data) => {
//         setStatus(data.status);
//         setCustomerEmail(data.customer_email);
//       });
//   }, []);

//   if (status === "open") {
//     return <Navigate to="/checkout" />;
//   }

//   if (status === "complete") {
//     return (
//       <section id="success">
//         <p>
//           We appreciate your business! A confirmation email will be sent to{" "}
//           {customerEmail}. If you have any questions, please email{" "}
//           <a href="mailto:orders@example.com">orders@example.com</a>.
//         </p>
//       </section>
//     );
//   }

//   return null;
// };

const CheckoutPage = () => {
  return <div className="checkoutPage"></div>;
};

export default CheckoutForm;
