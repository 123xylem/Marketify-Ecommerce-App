import { useEffect, useState } from "react";
import { ResponseMessage } from "../components/ResponseMessage";
import ProductList from "../components/product/ProductList";
import { useLocation } from "react-router-dom";
import api from "../api";

const CategoryPage = () => {
  const [loading, setLoading] = useState(true);
  const [sucessMsg, setSuccessMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [productData, setProductData] = useState([]);
  const location = useLocation();
  const { pathname, search } = location;
  const category = pathname.split("/")[3];

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get(`/products/?cat=${category}`);
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
  }, [category]);

  return (
    <div>
      <ResponseMessage message={sucessMsg} err={errorMsg}></ResponseMessage>
      <ProductList products={productData}></ProductList>
      Category page {category}
    </div>
  );
};
export default CategoryPage;
