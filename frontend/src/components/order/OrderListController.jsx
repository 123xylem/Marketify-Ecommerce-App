/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

const OrderListController = ({ data, isError, error, pageNum, setPageNum }) => {
  // const [nextPage, setNextPage] = useState(null);
  // const [prevPage, setPrevPage] = useState(null);

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
    <div className="order-list-controller bg-gray-200  w-full p-4 flex flex-col gap-2 flex-wrap max-w-min min-w-[180px] ">
      {data?.count == "undefined" ||
        (pageNum === null && (
          <>
            <button
              className="mx-0 bg-gray-700 p-2 text-white rounded max-w-[150px]"
              onClick={nextOrders}
            >
              Show Past orders
            </button>
          </>
        ))}

      {data?.count && (
        <div className="font-semibold text-lg ">
          Total Orders: {data?.count}
        </div>
      )}
      {console.log(data, pageNum)}

      {isError && <span>Error: {error.message}</span>}
      {/* {console.log(data.count, "aaa", pageNum)} */}
      {data?.count > 0 && pageNum > 0 && (
        <>
          <div>Page Num: {pageNum}</div>
          <div className="btn-row flex gap-4">
            <button
              className={` rounded p-2 ${pageNum < 2 ? "bg-[#cccccc]  text-[#666666]" : "bg-green-400"}`}
              disabled={pageNum < 2}
              onClick={previousOrders}
            >
              Previous
            </button>
            <button
              className={`rounded p-2 ${pageNum >= data.count / 3 ? "bg-[#cccccc]  text-[#666666]" : "bg-green-400 "}`}
              disabled={pageNum >= data.count / 3}
              onClick={nextOrders}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default OrderListController;
