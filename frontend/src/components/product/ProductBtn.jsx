/* eslint-disable react/prop-types */
import api from "../../api";
import { useNavigate } from "react-router-dom";

const handleClick = async (productId, buyNow = false, setState, navigate) => {
  try {
    const url = `cart/add/${productId}/`;
    const response = await api.post(url, {
      body: JSON.stringify({
        buy_now: `${buyNow}`,
        product_id: productId,
      }),
    });
    if (response) {
      const data = await response.data;
      if (response.status === 200) {
        if (!buyNow) {
          setState();
        }
        console.info("Cart item updated:", data);
        if (buyNow) {
          navigate("/cart");
        }
      }
    } else {
      console.error("Failed to update item", response);
    }
  } catch (error) {
    console.error("Error updating cart item:", error);
  }
};

export function ProductBtn({ productId, buyNow, setState }) {
  const navigate = useNavigate();

  return (
    <>
      {buyNow ? (
        <button
          className="buy-now-btn"
          onClick={() => handleClick(productId, buyNow, null, navigate)}
        >
          Buy Now
        </button>
      ) : (
        <button
          className="add-to-cart-btn"
          onClick={() => handleClick(productId, false, setState)}
        >
          Add to Cart
        </button>
      )}
    </>
  );
}
