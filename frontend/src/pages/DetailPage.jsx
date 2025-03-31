/* eslint-disable react/prop-types */
import api from "../api";
import { useLocation, useParams } from "react-router-dom";
import ButtonContainer from "../components/product/ButtonContainer";
import ProductList from "../components/product/ProductList";
import { useQuery } from "@tanstack/react-query";

const DetailPage = () => {
  const { state } = useLocation();
  const { slug } = useParams();
  let url = `/products/${state.item.product_id ? state.item.product_id : state.item.id}/`;
  // alert(JSON.stringify(state.item.id, state.item.product_id));
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
  console.log(data, "DATA");
  return (
    <>
      {data && (
        <div className="detail-container flex flex-wrap justify-between sm:flex-nowrap gap-8 ">
          <div className="product-detail min-w-min max-w-[1000px]">
            <div className="product-card flex flex-col gap-4">
              <div className="detail-cta-div flex flex-wrap ">
                <div className="flex flex-wrap flex-col sm:gap-4 ">
                  <h1 className="product-title max-w-[400px] break-words font-bold text-xl">
                    {data.product.title}
                  </h1>

                  <img
                    className="max-w-220 sm:max-w-xs border"
                    src={data.product.image}
                    alt={data.product.image}
                  ></img>
                </div>

                <div className="flex mt-auto flex-col  ">
                  <p className="product-price mt-auto font-bold">
                    ${data.product.price}
                  </p>

                  <ButtonContainer
                    item={data.product}
                    classOveride={
                      "flex flex-wrap gap-2 items-center mt-4 justify-start"
                    }
                  />
                </div>
              </div>
              <p className="product-description">{data.product.description}</p>
              <div className="categories flex gap-2 min-w-min">
                {data.product.category
                  ?.filter((x) => x != [])
                  .map((cat) => (
                    <p
                      className="category"
                      key={`${cat?.id}-${data.product.id}`}
                    >
                      #{cat.title}
                    </p>
                  ))}
              </div>
            </div>
          </div>

          <div className="product-sidebar min-w-[200px] flex flex-col">
            <h3 className="font-bold text-xl">Related Products</h3>
            <ProductList related={true} products={data.related_products} />
          </div>
        </div>
      )}
    </>
  );
};

export default DetailPage;
