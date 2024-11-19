import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import OrderProductCard from "../components/order/OrderProductCard";
import api from "../api";

const CheckoutPage = () => {
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const username = localStorage.getItem("username");
  const userID = localStorage.getItem("userID");
  let lastOrder;
  const {
    isPending,
    isError,
    data: orderData,
    error,
    refetch,
  } = useQuery({
    queryKey: ["checkout", username + userID],
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
    <div
      id="checkout"
      className={`${checkoutSuccess ? "bg-green-700 p-4 text-white" : ""}`}
    >
      <h1 className=" text-xl font-bold pb-4">
        {isError && ("Error:", error)}
        {checkoutSuccess ? "ORDER SUCCESS" : "The order was not processed"}
      </h1>
      <div className="order-list flex">
        {isPending && "Loading...."}
        {lastOrder && checkoutSuccess ? (
          <div className="order-item flex gap-4 flex-col" key={lastOrder.id}>
            <h2 className="font-semi-bold">
              <span className="font-bold text-lg"> ID: {lastOrder.id}</span>
              <br></br>
              Total: ${lastOrder.total_price.toLocaleString()} <br></br>Date:{" "}
              {lastOrder.created_at.slice(0, 10)}
            </h2>
            <div className="product-list bg-white text-black flex flex-wrap gap-4 ">
              {lastOrder.products_list
                ? lastOrder.products_list.map((product) => (
                    <div
                      className="product-item"
                      key={`${lastOrder.id}-${product.id}`}
                    >
                      <OrderProductCard cartItem={true} item={product} />
                    </div>
                  ))
                : ""}
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;
