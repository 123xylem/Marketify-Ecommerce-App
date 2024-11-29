import { useState } from "react";
import api from "../../api";
import { useNavigate } from "react-router-dom";
import { FaMagnifyingGlass } from "react-icons/fa6";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await api.get(`/products/?search=${searchTerm}`);
      if (response.status == 200 && response.data) {
        console.log(response);
        const results = [];

        response.data.forEach((res) => {
          let { id, title, description, price, slug, category, image } = res;
          results.push({
            id,
            title,
            description,
            price,
            slug,
            category,
            image,
          });
        });

        navigate(`/search-results?${searchTerm}`, { state: { results } });
      }
    } catch (err) {
      console.log("search error: ", err);
    }
  };

  const handleChange = (event) => {
    const query = event.target.value;
    setSearchTerm(query);
  };
  return (
    <>
      <div className="ml-auto  flex items-center gap-1 ">
        <form
          onSubmit={handleSubmit}
          className="search-bar-form items-center flex nowrap"
        >
          <input
            type="text"
            placeholder="Search products"
            onChange={handleChange}
            value={searchTerm}
            className="p-1 sm:max-w-min max-w-[130px] rounded"
          />
          <button className="pl-2 text-xl hidden md:flex" type="submit">
            <FaMagnifyingGlass color={"white"} />
          </button>
        </form>
      </div>
    </>
  );
};
export default SearchBar;
