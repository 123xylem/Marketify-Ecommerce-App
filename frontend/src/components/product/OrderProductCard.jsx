/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const OrderProductCard = ({ item, cartItem = false }) => {
  return (
    <div className="product-card border flex flex-col border-gray-700 p-4 gap-4  min-w-min ">
      <Link
        className="product-card gap-2 flex flex-col max-w-[220px]"
        to={"/products/product/" + item.slug + "/"}
        state={{ item }}
      >
        <img
          loading="lazy"
          className={`object-cotain ${cartItem ? "max-w-[150px] sm:max-w-[100px]" : "max-w-[8rem] sm:w-[250px] sm:h-auto"}`}
          src={item.product.image}
          alt={item.product.image}
        ></img>
        <h3
          className={`product-title font-bold max-w-[220px] sm:max-w-[240px]  ${cartItem ? "line-clamp-2 max-w-[150px] sm:max-w-[180px]" : ""}`}
        >
          {item.product.title}
        </h3>
        <p className="product-price font-semibold">${item.product.price}</p>
      </Link>

      <p className="mt-auto ml-auto text-right text-black flex-1">
        Quantity: {item.quantity}
      </p>
    </div>
  );
};

export default OrderProductCard;
