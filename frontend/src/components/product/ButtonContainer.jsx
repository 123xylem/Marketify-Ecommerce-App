/* eslint-disable react/prop-types */
import { ProductBtn } from "./ProductBtn";
import { useState } from "react";

const ButtonContainer = ({ item }) => {
  const [isAdded, setIsAdded] = useState(false);

  const handleCartStatus = () => {
    setIsAdded(true);
  };

  return (
    <div className="flex gap-2  mt-auto justify-between items-center">
      <ProductBtn productId={item.id} setState={handleCartStatus}></ProductBtn>
      {isAdded ? (
        <p className="status-msg status-ok text-xs font-bold text-green-600">
          Added!
        </p>
      ) : (
        ""
      )}

      <ProductBtn productId={item.id} buyNow="true"></ProductBtn>
    </div>
  );
};

export default ButtonContainer;
