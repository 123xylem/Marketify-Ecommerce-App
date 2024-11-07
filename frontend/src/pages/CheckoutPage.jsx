import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import api from "../api";

const CheckoutPage = () => {
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const username = localStorage.getItem("username");
  let lastOrder;
  const {
    isPending,
    isError,
    data: orderData,
    error,
    refetch,
  } = useQuery({
    queryKey: ["checkout", username],
    queryFn: async () => {
      const response = await api.get("/orders/?limit=1");
      setCheckoutSuccess(true);
      return await response.data;
    },
    staleTime: 30 * 1000,
    enabled: false,
  });

  if (window.location.search.includes("success") && checkoutSuccess === false) {
    console.log("fetching");
    refetch();
  }

  if (!isPending && orderData) {
    lastOrder = orderData.results[0];
  }

  return (
    <div id="checkout">
      <h1>
        {isError && ("Error:", error)}
        {checkoutSuccess ? "ORDER SUCCESS" : "The order was not processed"}
      </h1>
      <div className="order-list flex-box">
        {isPending && "Loading...."}
        {lastOrder && checkoutSuccess ? (
          <div className="order-item flex-item" key={lastOrder.id}>
            <h3>
              ID: {lastOrder.id} - Date: {lastOrder.created_at}
            </h3>
            <div className="product-list grid-box">
              {lastOrder.products_list
                ? lastOrder.products_list.map((product) => (
                    <div
                      className="product-item grid-item"
                      key={`${lastOrder.id}-${product.id}`}
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
            <p>Total: ${lastOrder.total_price}</p>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;
