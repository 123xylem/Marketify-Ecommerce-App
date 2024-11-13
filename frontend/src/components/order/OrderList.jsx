/* eslint-disable react/prop-types */
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import api from "../../api";
import { ResponseMessage } from "../ResponseMessage";
import { useQuery } from "@tanstack/react-query";
import OrderProductCard from "../product/OrderProductCard";
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
    <div className="order-list">
      <div className="order-list-controller bg-gray-200 p-4 flex flex-col gap-2 flex-wrap max-w-min min-w-[180px]">
        {data?.count && (
          <div className="font-semibold ">Total Orders: {data?.count}</div>
        )}

        {data?.count == null || pageNum == 0 ? (
          <>
            <button
              className="mx-0 bg-gray-700 p-2 text-white rounded max-w-[150px]"
              onClick={nextOrders}
            >
              Show Past orders
            </button>
          </>
        ) : (
          ""
        )}

        {isError && <span>Error: {error.message}</span>}

        {data?.count > 1 && pageNum > 0 ? (
          <>
            <div>Page Num: {pageNum}</div>
            <div className="btn-row flex gap-4">
              <button
                className={`bg-green-400 rounded p-2 ${pageNum == 1 ? "bg-[#cccccc]  text-[#666666]" : ""}`}
                disabled={pageNum == 1}
                onClick={previousOrders}
              >
                Previous
              </button>
              <button
                className={`bg-green-400 rounded p-2 ${pageNum >= data.count / 3 ? "bg-[#cccccc]  text-[#666666]" : ""}`}
                disabled={pageNum >= data.count / 3}
                onClick={nextOrders}
              >
                Next
              </button>
            </div>
          </>
        ) : (
          ""
        )}
      </div>
      {data?.count > 1 && pageNum > 0 ? (
        <div className="order-list-orders flex gap-4 flex-wrap">
          {data?.results.map((item) => (
            <div className="order-item p-4 flex border flex-col" key={item.id}>
              <h2 className="font-semi-bold  py-4">
                <span className="font-bold text-lg"> ID: {item.id}</span>
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
