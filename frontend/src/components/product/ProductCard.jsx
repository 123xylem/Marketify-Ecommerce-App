/* eslint-disable react/prop-types */
// import { ProductBtn } from "./ProductBtn";
import ButtonContainer from "./ButtonContainer";
import { Link } from "react-router-dom";
// import { useState } from "react";
// import ProductDetailPage from "../pages/ProductDetailPage";
const ProductCard = ({ item }) => {
  return (
    <div className="product-card border border-gray-700 p-4 max-w-300 min-w-min sm:max-w-xs ">
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
        <h3 className="product-title font-bold max-w-[220px] ">{item.title}</h3>
        <p className="product-description max-w-[220px]">
          {item.description.slice(0, 60) + "..."}
        </p>
        <p className="product-price font-semibold">${item.price}</p>
      </Link>
      <ButtonContainer item={item} />
    </div>
  );
};

export default ProductCard;
