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
  const { slug } = useParams();

  useEffect(() => {
    relatedProducts = [];
    const fetchProductData = async () => {
      try {
        let url = state ? `/products/${state.item.id}/` : `/products/${slug}/`;

        const response = await api.get(url);

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
      {console.log([relatedProducts, "related"], productData.title)}
      <h1 className="product-title">{productData.title}</h1>
      {/* <ResponseMessage message={successMsg} err={errMsg}></ResponseMessage> */}
      {/* {console.log(relatedProducts)} */}
      <div className="product-card">
        <img src={productData.image} alt={productData.image}></img>
        <p className="product-description">{productData.description}</p>
        <p className="product-price">${productData.price}</p>
        <div className="categories">
          {productData.category
            ?.filter((x) => x != [])
            .map((cat) => (
              <p className="category" key={`${cat?.id}-${productData.id}`}>
                {cat.title}
              </p>
            ))}
        </div>

        <ProductBtn
          className="add-to-cart-btn"
          productId={productData.id}
        ></ProductBtn>
        <ProductBtn
          className="buy-now-btn"
          productId={productData.id}
          buyNow="true"
        ></ProductBtn>
      </div>
      <div className="product-sidebar">
        <h3>Related Products</h3>
        <ProductList products={relatedProducts} />
      </div>
    </>
  );
};

export default ProductDetail;
