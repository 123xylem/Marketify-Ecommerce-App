import { useState, useEffect } from "react";

import api from "../api";

const CheckoutPage = () => {
  // const location = useLocation();
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(false);

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
      {/* {console.log(orderData)} */}
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
