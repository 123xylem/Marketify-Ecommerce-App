// import { useEffect, useState } from "react";
// import { ResponseMessage } from "../components/ResponseMessage";
// import ProductList from "../components/product/ProductList";
// import { useLocation } from "react-router-dom";
// import api from "../api";

// const CategoryPage = () => {
//   const [loading, setLoading] = useState(true);
//   const [sucessMsg, setSuccessMsg] = useState(null);
//   const [errorMsg, setErrorMsg] = useState(null);
//   const [productData, setProductData] = useState([]);
//   const location = useLocation();
//   const { pathname, search } = location;
//   const category = pathname.split("/")[3];

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const response = await api.get(`/products/?cat=${category}`);
//         if (!response.status) {
//           throw new Error("Network response was not ok");
//         }
//         const data = await response.data;

//         setProductData(data);
//       } catch (err) {
//         console.log(err);
//         setErrorMsg(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchUserData();
//   }, [category]);

//   return (
//     <div>
//       <ResponseMessage message={sucessMsg} err={errorMsg}></ResponseMessage>
//       <ProductList products={productData}></ProductList>
//       Category page {category}
//     </div>
//   );
// };
// export default CategoryPage;

import { ResponseMessage } from "../components/ResponseMessage";
import ProductList from "../components/product/ProductList";
import { useLocation } from "react-router-dom";
import api from "../api";
import { useQuery } from "@tanstack/react-query";

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
      <h1>Category page {category}</h1>
      <ProductList products={data}></ProductList>
    </div>
  );
};
export default CategoryPage;
