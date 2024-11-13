/* eslint-disable react/prop-types */
import api from "../api";
import { useLocation, useParams } from "react-router-dom";
import ButtonContainer from "../components/product/ButtonContainer";
// import { ResponseMessage } from "../components/ResponseMessage";
// import ProductRelatedSidebar from "../components/product/ProductRelatedSidebar";
import ProductList from "../components/product/ProductList";
import { useQuery } from "@tanstack/react-query";

const DetailPage = () => {
  const { state } = useLocation();
  const { slug } = useParams();

  let url = state ? `/products/${state.item.id}/` : `/products/${slug}/`;

  const { isError, data, error } = useQuery({
    queryKey: ["product-detail", slug],
    queryFn: async () => {
      const response = await api.get(url);
      if (!response.status) {
        throw new Error("Network response was not ok");
      }
      return response.data;
    },
    staleTime: 60 * 1000 * 60,
  });

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <>
      {data && (
        <div className="detail-container flex flex-wrap sm:flex-nowrap gap-8 ">
          <div className="product-detail w-100">
            <h1 className="product-title">{data.product.title}</h1>
            <div className="product-card">
              <img
                className="max-w-220 sm:max-w-xs "
                src={data.product.image}
                alt={data.product.image}
              ></img>
              <p className="product-description">{data.product.description}</p>
              <p className="product-price">${data.product.price}</p>
              <div className="categories">
                {data.product.category
                  ?.filter((x) => x != [])
                  .map((cat) => (
                    <p
                      className="category"
                      key={`${cat?.id}-${data.product.id}`}
                    >
                      {cat.title}
                    </p>
                  ))}
              </div>
            </div>
            <ButtonContainer item={data.product} />
            {/* <ProductBtn
              className="add-to-cart-btn"
              productId={data.product.id}
            ></ProductBtn>
            <ProductBtn
              className="buy-now-btn"
              productId={data.product.id}
              buyNow="true"
            ></ProductBtn> */}
          </div>

          <div className="product-sidebar flex flex-col">
            <h3>Related Products</h3>
            <ProductList related={true} products={data.related_products} />
          </div>
        </div>
      )}
    </>
  );
};

export default DetailPage;
