import { ResponseMessage } from "../components/ResponseMessage";
import ProductList from "../components/product/ProductList";
import { useQuery } from "@tanstack/react-query";

import api from "../api";
const HomePage = () => {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await api.get("/products/");
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
      <ProductList products={data}></ProductList>
      Home
    </div>
  );
};
export default HomePage;

// import { useEffect, useState } from "react";
// import { ResponseMessage } from "../components/ResponseMessage";
// import ProductList from "../components/product/ProductList";

// import api from "../api";
// const HomePage = () => {
//   const [loading, setLoading] = useState(true);
//   const [sucessMsg, setSuccessMsg] = useState(null);
//   const [errorMsg, setErrorMsg] = useState(null);
//   const [productData, setProductData] = useState([]);
//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const response = await api.get("/products/");
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
//   }, []);

//   return (
//     <div>
//       <ResponseMessage message={sucessMsg} err={errorMsg}></ResponseMessage>
//       <ProductList products={productData}></ProductList>
//       Home
//     </div>
//   );
// };
// export default HomePage;
