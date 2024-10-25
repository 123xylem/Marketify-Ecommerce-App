/* eslint-disable react/prop-types */
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import api from "../../api";
import { ResponseMessage } from "../ResponseMessage";

const OrderList = ({ data }) => {
  const [orderData, setOrderData] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [totalOrders, setTotalOrders] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sucessMsg, setSuccessMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const getOrderData = async () => {
    try {
      setLoading(true);
      const response = await api.get("/orders/?page=1");
      if (!response.status) {
        throw new Error("Network response was not ok");
      }
      const data = await response.data;
      setTotalOrders(data.count);
      setOrderData(data);
      if (
        !data.results ||
        !Array.isArray(data.results) ||
        data.results.length === 0
      ) {
        setErrorMsg("You have 0 past Orders");
      }
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  const previousOrders = async () => {
    try {
      setPageNum(pageNum - 1);
      const url = `/orders/?page=${pageNum - 1}`;
      const response = await api.get(url);
      if (!response.status) {
        throw new Error("Network response was not ok");
      }
      const data = await response.data;
      // console.log(data, "from profile");
      setOrderData(data);
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  const nextOrders = async () => {
    try {
      setPageNum(pageNum + 1);
      const url = `/orders/?page=${pageNum + 1}`;
      const response = await api.get(url);
      if (!response.status) {
        throw new Error("Network response was not ok");
      }
      const data = await response.data;
      // console.log(data, "from profile");
      setOrderData(data);
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="order-list flex-box">
      <ResponseMessage message={sucessMsg} err={errorMsg}></ResponseMessage>
      <div>Total Orders: {totalOrders}</div>

      {totalOrders == null ? (
        <>
          <button onClick={getOrderData}>Show Past orders</button>
        </>
      ) : (
        ""
      )}
      {loading ? <div>Loading...</div> : ""}

      {orderData?.results.length > 0 ? (
        <>
          <div>Page Num: {pageNum}</div>

          <button disabled={pageNum == 1} onClick={previousOrders}>
            Previous
          </button>
          <button disabled={pageNum >= totalOrders / 10} onClick={nextOrders}>
            Next
          </button>
        </>
      ) : (
        ""
      )}
      {orderData?.results.map((item) => (
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
    </div>
  );
};

OrderList.propTypes = {
  data: PropTypes.array,
};

export default OrderList;
