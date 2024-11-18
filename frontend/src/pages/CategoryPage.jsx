import { ResponseMessage } from "../components/ResponseMessage";
import ProductList from "../components/product/ProductList";
import { useLocation } from "react-router-dom";
import api from "../api";
import { useQuery } from "@tanstack/react-query";
import PageBanner from "../components/PageBanner";

const CategoryPage = () => {
  const location = useLocation();
  const { pathname } = location;
  const category = pathname.split("/")[3];
  console.log(pathname, category);

  const { isPending, isError, data, error } = useQuery({
    queryKey: [`products-${category}`, category],
    queryFn: async () => {
      const response = await api.get(`/products/?cat=${category}`);
      if (!response.status) {
        throw new Error("Network response was not ok");
      }
      return await response.data;
    },
    staleTime: 60 * 1000 * 5,
  });

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div>
      <ResponseMessage message={""} err={error?.message}></ResponseMessage>
      <PageBanner
        title={decodeURIComponent(category)}
        data={false}
        color={""}
      />
      <ProductList products={data}></ProductList>
    </div>
  );
};
export default CategoryPage;
