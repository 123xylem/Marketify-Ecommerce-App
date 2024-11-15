/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const OrderProductCard = ({ item, cartItem = false }) => {
  return (
    <div className="product-card flex-1 flex flex-col border-gray-700 p-4 gap-2  min-w-min ">
      <Link
        className="product-card  flex flex-col max-w-[220px]"
        to={"/products/product/" + item.slug + "/"}
        state={{ item }}
      >
        <img
          loading="lazy"
          className={`object-cotain pb-2 ${cartItem ? "max-w-[80px] sm:max-w-[100px]" : "max-w-[8rem] sm:w-[250px] sm:h-auto"}`}
          src={item.product.image}
          alt={item.product.image}
        ></img>
        <h3
          className={`product-title font-bold max-w-[220px] sm:max-w-[240px]  ${cartItem ? "truncate max-w-[150px] sm:max-w-[180px]" : ""}`}
        >
          {item.product.title}
        </h3>
        <p className="product-price font-semibold">${item.product.price}</p>
      </Link>

      <p className={`mt-auto    ${cartItem ? "mr-auto" : "text-right"} flex-1`}>
        Quantity: {item.quantity}
      </p>
    </div>
  );
};

export default OrderProductCard;
