/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
// import ProductDetailPage from "../pages/ProductDetailPage";
const RelatedProductCard = ({ item }) => {
  return (
    <div className="product-card">
      <Link to={"/products/product/" + item.slug + "/"} state={{ item }}>
        <img src={item.image} alt={item.image}></img>
        <h3 className="product-title">{item.title}</h3>
        <p className="product-price">${item.price}</p>
      </Link>
    </div>
  );
};

export default RelatedProductCard;