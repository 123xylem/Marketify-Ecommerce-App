import PropTypes from "prop-types";

const OrderList = ({ data }) => {
  if (!data || !Array.isArray(data) || data.length === 0) {
    return <div>You have 0 past Orders</div>;
  }

  return (
    <div className="order-list flex-box">
      <h3>Your Past Orders</h3>
      {data.map((item) => (
        <div className="order-item flex-item" key={item.id}>
          <h3>
            ID: {item.id} - Date: {item.created_at}
          </h3>
          <div className="product-list">
            {item.product_list.map((product) => (
              <div className="product-item" key={`${item.id}-${product.id}`}>
                <p>{product.product.title}</p>
                <p>${product.product.price}</p>
                <img
                  src={product.product.image}
                  alt={product.product.image}
                ></img>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

OrderList.propTypes = {
  data: PropTypes.array,
};

export default OrderList;
