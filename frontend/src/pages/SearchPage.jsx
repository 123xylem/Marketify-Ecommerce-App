import ProductList from "../components/product/ProductList";
import { useLocation } from "react-router-dom";

const SearchPage = () => {
  const { state } = useLocation();
  console.log(state, "state");
  return (
    <div>
      <h1> Search PAGE</h1>
      {state ? (
        <ProductList products={state.results}></ProductList>
      ) : (
        "No results found"
      )}
    </div>
  );
};
export default SearchPage;
