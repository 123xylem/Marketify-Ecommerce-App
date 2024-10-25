/* eslint-disable react/prop-types */
import { ProductBtn } from "./ProductBtn";
import { Link } from "react-router-dom";
import { useState } from "react";
// import ProductDetailPage from "../pages/ProductDetailPage";
export function ProductCard({ item }) {
  const [isAdded, setIsAdded] = useState(false);
  const handleCartStatus = () => {
    setIsAdded(true);
  };

  return (
    <div className="product-card">
      <Link to={"/products/product/" + item.slug + "/"} state={{ item }}>
        <img src={item.image} alt={item.image}></img>
        <h3 className="product-title">{item.title}</h3>
        <p className="product-description">{item.description}</p>
        <p className="product-price">${item.price}</p>
        <div className="categories flex-list">
          {item.category
            ?.filter((x) => x != [])
            .map((cat) => (
              <p className="category" key={`${cat?.id}-${item.id}`}>
                {cat.title}
              </p>
            ))}
        </div>
      </Link>

      <ProductBtn
        className="add-to-cart-btn"
        productId={item.id}
        setState={handleCartStatus}
      ></ProductBtn>
      <ProductBtn
        className="buy-now-btn"
        productId={item.id}
        buyNow="true"
      ></ProductBtn>
      {isAdded ? <p className="status-msg status-ok">Added!</p> : ""}
    </div>
  );
}
