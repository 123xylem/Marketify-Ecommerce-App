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
      if (response.response.status === 200) {
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
    if (error.status === 401) {
      localStorage.setItem("cartItem", `${productId}`);
      window.location.href = "/login";
      console.log("You must login to make a purchase");
    }

    console.error("Error updating cart item:", error);
  }
};

export function ProductBtn({ productId, buyNow, setState }) {
  const navigate = useNavigate();

  return (
    <>
      {buyNow ? (
        <button
          className="buy-now-btn min-w-min p-1 sm:p-2 bg-green-700 border hover:underline rounded-md text-sm sm:text-base text-white font-bold"
          onClick={() => handleClick(productId, buyNow, null, navigate)}
        >
          Buy Now
        </button>
      ) : (
        <button
          className="add-to-cart-btn p-1 sm:p-2 bg-black border rounded-md hover:underline text-sm sm:text-base text-white font-bold"
          onClick={() => handleClick(productId, false, setState)}
        >
          Add to Cart
        </button>
      )}
    </>
  );
}
