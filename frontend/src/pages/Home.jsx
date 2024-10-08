import { useEffect, useState } from "react";
import { ResponseMessage } from "../components/ResponseMessage";
import ProductList from "../components/ProductList";

import api from "../api";
const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [sucessMsg, setSuccessMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [productData, setProductData] = useState([]);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get("/products/");
        if (!response.status) {
          throw new Error("Network response was not ok");
        }
        const data = await response.data;

        setProductData(data);
      } catch (err) {
        console.log(err);
        setErrorMsg(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  return (
    <div>
      <ResponseMessage message={sucessMsg} err={errorMsg}></ResponseMessage>
      <ProductList products={productData}></ProductList>
      Home
    </div>
  );
};
export default HomePage;
