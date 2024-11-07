import PropTypes from "prop-types";
import { ProductCard } from "./ProductCard";

const ProductList = ({ products }) => {
  if (!products || products.length === 0) {
    return <div>0 Products found</div>;
  }
  return (
    <>
      <div className="product-list-container">
        {products.map((item) => (
          <ProductCard key={item.id} item={item}></ProductCard>
        ))}
      </div>
    </>
  );
};
ProductList.propTypes = {
  products: PropTypes.array,
};

export default ProductList;
