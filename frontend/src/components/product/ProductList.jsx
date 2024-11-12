import PropTypes from "prop-types";
import ProductCard from "./ProductCard";
import RelatedProductCard from "./RelatedProductCard";

const ProductList = ({ products, related }) => {
  if (!products || products.length === 0) {
    return <div>0 Products found</div>;
  }
  return (
    <>
      <div
        className={`product-list-container ${related ? "related-sidebar" : ""}`}
      >
        {related
          ? products.map((item) => (
              <RelatedProductCard key={item.id} item={item} />
            ))
          : products.map((item) => <ProductCard key={item.id} item={item} />)}
      </div>
    </>
  );
};
ProductList.propTypes = {
  products: PropTypes.array,
  related: PropTypes.boolean,
};

export default ProductList;
