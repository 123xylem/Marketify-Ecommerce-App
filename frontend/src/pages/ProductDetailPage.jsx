/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import api from "../api";
import { useLocation, useParams } from "react-router-dom";
import { ProductBtn } from "../components/ProductBtn";
import { ResponseMessage } from "../components/ResponseMessage";
import ProductRelatedSidebar from "../components/ProductRelatedSidebar";
import ProductList from "../components/ProductList";

let relatedProducts = [];

const ProductDetail = () => {
  const [loading, setLoading] = useState(true);
  const [sucessMsg, setSuccessMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [productData, setProductData] = useState(null);
  const { state } = useLocation();
  const { slug } = useParams(); // Get product slug from URL

  console.log(productData, "Prod Data from page");

  useEffect(() => {
    relatedProducts = [];
    const fetchProductData = async () => {
      try {
        const response = await api.get(`/products/${state.item.id}/`);
        if (!response.status) {
          throw new Error("Network response was not ok");
        }
        const productData = await response.data.product;
        relatedProducts = await response.data.related_products;
        setProductData(productData);
        // setSuccessMsg(productData);
      } catch (err) {
        setErrorMsg(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [slug, state]);

  if (loading) return <div>Loading...</div>;
  return (
    <>
      {console.log([relatedProducts, "related"], state.item.title)}
      <h1 className="product-title">{state.item.title}</h1>
      {/* <ResponseMessage message={successMsg} err={errMsg}></ResponseMessage> */}
      {/* {console.log(relatedProducts)} */}
      <div className="product-card">
        <img src={state.item.image} alt={state.item.image}></img>
        <p className="product-description">{state.item.description}</p>
        <p className="product-price">${state.item.price}</p>
        <div className="categories">
          {state.item.category
            ?.filter((x) => x != [])
            .map((cat) => (
              <p className="category" key={`${cat?.id}-${state.item.id}`}>
                {cat.title}
              </p>
            ))}
        </div>

        <ProductBtn
          className="add-to-cart-btn"
          productId={state.item.id}
        ></ProductBtn>
        <ProductBtn
          className="buy-now-btn"
          productId={state.item.id}
          buyNow="true"
        ></ProductBtn>
      </div>
      <div className="product-sidebar">
        <ProductList products={relatedProducts} />
      </div>
    </>
  );
};

export default ProductDetail;
