import { useEffect, useState } from "react";
import { ResponseMessage } from "../components/ResponseMessage";
import ProductList from "../components/product/ProductList";
import { useLocation } from "react-router-dom";

const SearchPage = () => {
  const [loading, setLoading] = useState(true);
  const [sucessMsg, setSuccessMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [productData, setProductData] = useState([]);
  const { state } = useLocation();
  console.log(state, "state");
  return (
    <div>
      <ResponseMessage message={sucessMsg} err={errorMsg}></ResponseMessage>
      <ProductList products={state.results}></ProductList>
      Search PAGE
    </div>
  );
};
export default SearchPage;
