import { useState } from "react";
import api from "../../api";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    event.preventDefault();
    // const query = event.target.value;
    try {
      // alert(searchTerm);
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

  // useEffect(() => {
  // const getQueryData = async (searchTerm) => {
  //   try {
  //     alert(searchTerm);
  //     const response = await api.post(`/products/?search=${searchTerm}`);
  //     if (response.status == 200) {
  //       console.log(response);
  //     }
  //   } catch (err) {
  //     console.log("search error: ", err);
  //   }
  // };
  // getQueryData(searchTerm);
  // })

  return (
    <>
      <div className="search-bar-container">
        <form onSubmit={handleSubmit} className="search-bar-form">
          <input type="text" onChange={handleChange} value={searchTerm} />
          <button type="submit">Search</button>
        </form>
      </div>
    </>
  );
};
export default SearchBar;
