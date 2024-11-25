/* eslint-disable react/prop-types */
import ButtonContainer from "./ButtonContainer";
import { Link } from "react-router-dom";
import { CartProductBtn } from "./CartProductBtn";

const ProductCard = ({ item, cartItem = false }) => {
  return (
    <div className="product-card flex-1 border flex flex-col border-gray-700 p-2 gap-4 max-w-[260px] sm:min-w-[250px] ">
      <Link
        className="product-card gap-2 flex  flex-col max-w-[260px]"
        to={"/products/product/" + item.slug + "/"}
        state={{ item }}
      >
        <img
          loading="lazy"
          className={`object-cotain ${cartItem ? "max-w-[150px] sm:max-w-[100px]" : "max-w-[8rem] sm:w-[250px] sm:h-auto"}`}
          src={item.image}
          alt={item.image}
        ></img>
        <h3
          className={`product-title font-bold  sm:max-w-[280px]  ${cartItem ? "truncate  " : ""}`}
        >
          {item.title}
        </h3>
        <p className="product-price font-semibold">${item.price}</p>
      </Link>
      {cartItem ? (
        <div className="flex flex-wrap gap-4">
          <CartProductBtn
            action={"remove"}
            id={item.product_id}
            onClick={cartItem.btnHandler}
          />
          <CartProductBtn
            action={"add"}
            id={item.product_id}
            onClick={cartItem.btnHandler}
          />
          <p className="mt-auto ml-auto text-right text-black flex-1">
            Quantity: {cartItem.quantity}
          </p>
        </div>
      ) : (
        <ButtonContainer item={item} />
      )}
    </div>
  );
};

export default ProductCard;
