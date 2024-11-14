/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const RelatedProductCard = ({ item }) => {
  return (
    <div className="product-card">
      <Link to={"/products/product/" + item.slug + "/"} state={{ item }}>
        <img src={item.image} alt={item.image}></img>
        <h3 className="product-title truncate font-bold">{item.title}</h3>
        <p className="product-price">${item.price}</p>
      </Link>
    </div>
  );
};

export default RelatedProductCard;
