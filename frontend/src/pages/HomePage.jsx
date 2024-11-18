import { ResponseMessage } from "../components/ResponseMessage";
import ProductList from "../components/product/ProductList";
import { useQuery } from "@tanstack/react-query";
import PageBanner from "../components/PageBanner";
import api from "../api";
const HomePage = () => {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["products-all"],
    queryFn: async () => {
      const response = await api.get("/products/");
      if (!response.status) {
        throw new Error("Network response was not ok");
      }
      return await response.data;
    },
    staleTime: 60 * 1000 * 5,
    meta: {
      persist: false,
    },
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
        title={"Our Products"}
        // bgImg={"http://localhost:8000/media/images/products/hp-envy.webp"}
        bgColor={"black"}
        textColor={"white"}
        // text={"Our Products"}
      />
      {/* <h1 className="font-bold text-xl">Welcome</h1> */}
      <ProductList products={data}></ProductList>
    </div>
  );
};
export default HomePage;
