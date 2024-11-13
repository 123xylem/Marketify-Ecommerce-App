/* eslint-disable react/prop-types */
// import { ProductBtn } from "./ProductBtn";
import ButtonContainer from "./ButtonContainer";
import { Link } from "react-router-dom";
import { truncateString } from "../../utils";

const ProductCard = ({ item }) => {
  return (
    <div className="product-card border flex flex-col border-gray-700 p-4 gap-4 max-w-300 min-w-min sm:max-w-xs ">
      <Link
        className="product-card gap-2 flex flex-col "
        to={"/products/product/" + item.slug + "/"}
        state={{ item }}
      >
        <img
          loading="lazy"
          className="max-w-[12rem] sm:w-[320px] sm:h-[280px] sm:max-w-xs object-cotain"
          src={item.image}
          alt={item.image}
        ></img>
        <h3 className="product-title font-bold max-w-[220px] sm:max-w-[270px] ">
          {truncateString(item.title, 40)}
        </h3>
        <p className="product-price font-semibold">${item.price}</p>
      </Link>
      <ButtonContainer item={item} />
    </div>
  );
};

export default ProductCard;
