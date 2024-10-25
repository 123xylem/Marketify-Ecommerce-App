import PropTypes from "prop-types";
import { Link } from "react-router-dom";
const ProductSidebar = ({ relatedProducts }) => {
  if (!relatedProducts || relatedProducts.length === 0) {
    return <div className="product-sidebar">0 Related Products found</div>;
  }
  return (
    <>
      <div className="product-sidebar">
        {relatedProducts.map((item) => (
          <div className="related-item" key={item.id}>
            <Link
              to={"/product/" + item.slug + "/"}
              className="related-item-link"
              state={item}
            >
              <p>{item.title}</p>
              <img src={item.image} alt={item.title}></img>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

ProductSidebar.propTypes = {
  relatedProducts: PropTypes.array,
};

export default ProductSidebar;
