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
import OrderList from "../components/order/OrderList";

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
  // const location = useLocation();
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sucessMsg, setSuccessMsg] = useState(null);

  // const [createdCheckoutSession, setCreatedCheckoutSession] = useState(false);
  // const { slug } = useParams();
  // const { cartData } = location.state || { cartData: { cart: [] } };
  // const cartItems = cartData.cart;

  useEffect(() => {
    if (window.location.search.includes("success")) {
      console.log(checkoutSuccess, "pre");
      const getOrderData = async () => {
        try {
          setLoading(true);
          const response = await api.get("/orders/?page=1");
          if (!response.status) {
            throw new Error("Network response was not ok");
          }
          const data = await response.data;
          setOrderData(data?.results[0]);
          console.log(data.results[0], data.results.length);

          if (
            !data.results ||
            !Array.isArray(data.results) ||
            data.results.length === 0
          ) {
            alert("You have 0 past Orders");
            console.log("You have 0 past Orders");
          }
        } catch (err) {
          console.log(err.message);
        } finally {
          setLoading(false);
        }
      };
      setCheckoutSuccess(true);
      getOrderData();
    }
  }, []);

  return (
    <div id="checkout">
      <h1>Hi</h1>
      {console.log(orderData)}
      {checkoutSuccess ? "ORDER SUCCESS" : "Failed order"}
      <div className="order-list flex-box">
        {orderData ? (
          <div className="order-item flex-item" key={orderData.id}>
            <h3>
              ID: {orderData.id} - Date: {orderData.created_at}
            </h3>
            <div className="product-list grid-box">
              {orderData.products_list
                ? orderData.products_list.map((product) => (
                    <div
                      className="product-item grid-item"
                      key={`${orderData.id}-${product.id}`}
                    >
                      <p>{product.product.title}</p>
                      <p>${product.product.price}</p>
                      <img
                        src={product.product.image}
                        alt={product.product.image}
                      ></img>
                      <p>Quantity: {product.quantity}</p>
                    </div>
                  ))
                : ""}
            </div>
            <p>Total: ${orderData.total_price}</p>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;
