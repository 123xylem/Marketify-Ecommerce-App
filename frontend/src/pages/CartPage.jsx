/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import api from "../api";
// import OrderList from "../components/OrderList";
import { ResponseMessage } from "../components/ResponseMessage";
//TODO add quantity logic -->

const CartPage = () => {
  const [loading, setLoading] = useState(true);
  const [sucessMsg, setSuccessMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [cartData, setCartData] = useState(null);
  const username = localStorage.getItem("username").toUpperCase();
  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await api.get(`/cart/`, {});
        if (!response.status) {
          throw new Error("Network response was not ok");
        }
        const data = await response.data;
        console.log(data);
        setCartData(data);
      } catch (err) {
        setErrorMsg(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCartData();
  }, []);

  const handleChange = (e) => {
    const productId = e.target.value;

    setCartData((prevData) => {
      editCartData(productId);

      const updatedProductList = prevData.cart.product_list.filter(
        (id) => id !== productId
      );
      return {
        ...prevData,
        cart: {
          ...prevData.cart,
          product_list: updatedProductList,
        },
      };
    });

    console.log(cartData, "post Edit");
  };

  const editCartData = async (productId) => {
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const url = `cart/remove/${productId}/`;

      const response = await api.post(url);
      if (!response.status) {
        throw new Error("Network response was not ok");
      }
      setSuccessMsg("Cart Updated");
      setCartData((prevData) => ({
        ...prevData,
        products: response.data.products, // Replace entire products array
      }));
    } catch (err) {
      let errMessage = "";
      let customErr = false;
      if (!customErr) {
        errMessage = err.response.data.error;
      }
      setErrorMsg(errMessage);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  return (
    <>
      <ResponseMessage message={sucessMsg} err={errorMsg}></ResponseMessage>
      <div className="cart-section">
        <h1>Welcome to your cart . {username}</h1>
        {cartData.products.length > 0 ? (
          <div className="grid-box product-list">
            {cartData.products.map((product) => (
              <div className="product grid-item" key={product.id}>
                <h3>{product.title}</h3>
                <img src={product.image} alt={product.image}></img>
                <p>${product.price}</p>
                <p>
                  {product.category
                    ?.filter((x) => x != [])
                    .map((cat) => (
                      <span key={cat.id}>{cat.title}, </span>
                    ))}
                </p>
                <button
                  className="remove-product"
                  value={product.id}
                  onClick={handleChange}
                >
                  Remove Product
                </button>
              </div>
            ))}
          </div>
        ) : (
          "No products in cart"
        )}
      </div>
    </>
  );
};

export default CartPage;
