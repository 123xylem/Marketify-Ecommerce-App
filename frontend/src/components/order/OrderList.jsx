/* eslint-disable react/prop-types */
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import api from "../../api";
import { ResponseMessage } from "../ResponseMessage";
import { useQuery } from "@tanstack/react-query";
import OrderProductCard from "./OrderProductCard";
import OrderListController from "./OrderListController";

const OrderList = () => {
  const username = localStorage.getItem("username");
  const userID = localStorage.getItem("userID");
  // const [orderData, setOrderData] = useState(null);
  const [pageNum, setPageNum] = useState(null);

  const { isPending, isError, data, error, refetch } = useQuery({
    queryKey: ["order-data", username + userID, pageNum],
    queryFn: async ({ queryKey }) => {
      const [, , currentPageNum] = queryKey;
      console.log(pageNum, currentPageNum, "pages");
      console.log("Post?: ", currentPageNum);

      const response = await api.get(`/orders/?page=${currentPageNum || 1}`);
      if (!response.status) {
        throw new Error("Network response was not ok");
      }
      return await response.data;
    },
    staleTime: 0,
    cacheTime: 0,
    enabled: !!pageNum,
  });

  useEffect(() => {
    if (pageNum) {
      refetch();
    }
  }, [pageNum, refetch]);

  return (
    <div className="order-list">
      <OrderListController
        data={data}
        error={error}
        isPending={isPending}
        isError={isError}
        pageNum={pageNum}
        setPageNum={setPageNum}
      />
      {data?.count > 0 && pageNum > 0 ? (
        <div className="order-list-orders bg-gray-100 flex flex-wrap">
          {data?.results.map((item) => (
            <div
              className="order-item border bg-white gap-4 m-4 p-4 flex border flex-col"
              key={item.id}
            >
              <h2 className="font-semi-bold  ">
                <span className="font-bold text-lg"> Order ID: {item.id}</span>
                <br></br>
                Total: ${item.total_price} <br></br>Date:{" "}
                {item.created_at.slice(0, 10)}
              </h2>
              <div className="product-list flex flex-wrap gap-4 ">
                {item.products_list
                  ? item.products_list.map((product) => (
                      <div
                        className="product-item grid-item"
                        key={`${item.id}-${product.id}`}
                      >
                        <OrderProductCard cartItem={true} item={product} />
                      </div>
                    ))
                  : ""}
              </div>
            </div>
          ))}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
OrderList.propTypes = {
  data: PropTypes.array,
};

export default OrderList;
