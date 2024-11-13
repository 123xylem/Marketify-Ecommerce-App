/* eslint-disable react/prop-types */
import { ProductBtn } from "./ProductBtn";
import { useState } from "react";

const ButtonContainer = ({ item }) => {
  const [isAdded, setIsAdded] = useState(false);

  const handleCartStatus = () => {
    setIsAdded(true);
  };

  return (
    <div className="flex gap-2 my-4 justify-between align-center">
      <ProductBtn productId={item.id} setState={handleCartStatus}></ProductBtn>
      <ProductBtn productId={item.id} buyNow="true"></ProductBtn>
      {isAdded ? <p className="status-msg status-ok">Added!</p> : ""}
    </div>
  );
};

export default ButtonContainer;
