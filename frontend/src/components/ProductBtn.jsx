/* eslint-disable react/prop-types */
import api from "../api";
import { Link } from "react-router-dom";
import CartPage from "../pages/CartPage";

const handleClick = async (productId, buyNow = false, setState) => {
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
      if (response.status == 200) {
        if (!buyNow) {
          setState();
        }
        console.info("Cart item updated:", data);
      }
    } else {
      console.error("Failed to update item", response);
    }
  } catch (error) {
    console.error("Error updating cart item:", error);
  }
};

export function ProductBtn({ ...props }) {
  return (
    <>
      {props.buyNow ? (
        <Link to={"/cart"} component={<CartPage />}>
          <button
            className="buy-now-btn"
            onClick={() => handleClick(props.productId, props.buyNow)}
          >
            Buy Now
          </button>
        </Link>
      ) : (
        <button
          className="add-to-cart-btn"
          onClick={() =>
            handleClick(props.productId, props.buyNow, props.setState)
          }
        >
          Add to Cart
        </button>
      )}
    </>
  );
}
