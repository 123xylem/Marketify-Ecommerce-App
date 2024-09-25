const addToCartBtns = document.querySelectorAll(".add-to-cart-btn");
const buyNowBtns = document.querySelectorAll(".buy-now-btn");
const removeProductBtns = document.querySelectorAll(".remove-product");
const checkoutBtn = document.querySelector(".checkout-btn");
const csrfToken = document
  .querySelector('meta[name="csrf-token"]')
  .getAttribute("content");

if (addToCartBtns) {
  for (i = 0; i < addToCartBtns.length; i++) {
    addToCartBtns[i].addEventListener("click", function (event) {
      const productId = event.target.dataset.productId;
      processProduct(productId);
    });
  }
}
if (buyNowBtns) {
  for (i = 0; i < buyNowBtns.length; i++) {
    buyNowBtns[i].addEventListener("click", function (event) {
      const productId = event.target.dataset.productId;
      processProduct(productId, true);
    });
  }
}

async function processProduct(productId, buyNow = "", checkout = "") {
  try {
    url = `api/cart/add_product/${productId}/`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken,
      },
      body: JSON.stringify({
        buy_now: `${buyNow}`,
        checkout: `${checkout}`,
        product_id: productId,
      }),
    });
    if (response.ok) {
      const data = await response.json();
      console.log("Cart item updated:", data);
      // Update the UI accordingly
    } else {
      console.error("Failed to update item");
    }
  } catch (error) {
    console.error("Error updating cart item:", error);
  }
}

if (removeProductBtns) {
  for (i = 0; i < removeProductBtns.length; i++) {
    removeProductBtns[i].addEventListener("click", function (event) {
      const productId = event.target.dataset.productid;
      removeProduct(productId);
    });
  }
  async function removeProduct(productId) {
    try {
      url = `/api/cart/remove_product/${productId}/`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken,
        },
        body: JSON.stringify({ product_id: productId }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Cart item updated:", data);
        // Update the UI accordingly
      } else {
        console.error("Failed to update item");
      }
    } catch (error) {
      console.error("Error updating cart item:", error);
    }
  }
}

if (checkoutBtn) {
  checkoutBtn.addEventListener("click", function (event) {
    checkoutCart();
  });
}
async function checkoutCart() {
  try {
    url = `/api/cart/checkout/`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken,
      },
      body: JSON.stringify({}),
    });
    if (response.ok) {
      const data = await response.json();
      console.log("Checking Out:", data);
      // window.location.href = "/api/orders/";
      // Update the UI accordingly
    } else {
      console.error("Failed to checkout ", response);
    }
  } catch (error) {
    console.error("Error checking out:", error);
  }
}
