import ProductList from "../components/product/ProductList";
import { useLocation } from "react-router-dom";

const SearchPage = () => {
  const { state } = useLocation();
  // console.log(state, "state");
  return (
    <div>
      <h1 className="text-black text-xl font-bold "> Search Page</h1>
      {state ? (
        <ProductList products={state.results}></ProductList>
      ) : (
        <>
          <br /> <br />
          <p className="text-black">
            No results found for your search term. <br />
            You can search for products in the title and description.
          </p>
        </>
      )}
    </div>
  );
};
export default SearchPage;
