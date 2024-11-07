/* eslint-disable react/prop-types */
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import api from "../../api";
import { ResponseMessage } from "../ResponseMessage";
import { useQuery } from "@tanstack/react-query";

const OrderList = () => {
  const username = localStorage.getItem("username");
  const userID = localStorage.getItem("userID");
  // const [orderData, setOrderData] = useState(null);
  const [pageNum, setPageNum] = useState(null);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
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

  const previousOrders = async () => {
    if (pageNum > 1) {
      setPageNum((prev) => prev - 1);
      // refetch({ queryKey: ["order-data", username + userID, pageNum - 1] });
    }
  };

  const nextOrders = async () => {
    if (data?.count > pageNum / 3 || !pageNum) {
      console.log(pageNum, data?.count);
      setPageNum((prev) => (prev === null ? 1 : prev + 1));
      // refetch({ queryKey: ["order-data", username + userID, pageNum + 1] });
    }
  };

  return (
    <div className="order-list flex-box">
      {/* <ResponseMessage message={sucessMsg} err={errorMsg}></ResponseMessage> */}
      {data?.count && <div>Total Orders: {data?.count}</div>}

      {data?.count == null || pageNum == 0 ? (
        <>
          {/* <button onClick={getOrderData}>Show Past orders</button> */}
          <button onClick={nextOrders}>Show Past orders</button>
        </>
      ) : (
        ""
      )}

      {isError && <span>Error: {error.message}</span>}

      {data?.count > 1 && pageNum > 0 ? (
        <>
          <div>Page Num: {pageNum}</div>

          <button disabled={pageNum == 1} onClick={previousOrders}>
            Previous
          </button>
          <button disabled={pageNum >= data.count / 3} onClick={nextOrders}>
            Next
          </button>
          {data?.results.map((item) => (
            <div className="order-item flex-item" key={item.id}>
              <h3>
                ID: {item.id} - Date: {item.created_at}
              </h3>
              <div className="product-list grid-box">
                {item.products_list
                  ? item.products_list.map((product) => (
                      <div
                        className="product-item grid-item"
                        key={`${item.id}-${product.id}`}
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
              <p>Total: ${item.total_price}</p>
            </div>
          ))}
        </>
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
