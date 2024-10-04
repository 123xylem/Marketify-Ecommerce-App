/* eslint-disable react/prop-types */
import api from "../api";
const handleClick = async (productId, buyNow = false) => {
  try {
    const url = `cart/add_product/${productId}/`;
    const response = await api.post(url, {
      body: JSON.stringify({
        buy_now: `${buyNow}`,
        product_id: productId,
      }),
    });
    if (response.ok) {
      const data = await response.json();
      if (data.redirect_url && buyNow) {
        window.location.href = data.redirect_url;
        console.log(data.message);
      }
      console.debug("Cart item updated:", data);
      console.table("Cart item updated:", data);
      console.info("Cart item updated:", data);
      // Update the UI accordingly
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
      <button
        className="buy-now-btn"
        onClick={() => handleClick(props.productId, props.buyNow)}
      >
        {props.buyNow ? "Buy Now" : "Add to Cart"}
      </button>
    </>
  );
}
