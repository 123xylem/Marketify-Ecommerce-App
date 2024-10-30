/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import NavigationMenu from "./NavigationMenu";
import SearchBar from "./product/SearchBar";

const Header = (props) => {
  {
    console.log(props);
  }
  return (
    <div className="nav-container">
      <NavigationMenu categories={props.categories} />;
      <SearchBar />
    </div>
  );
};

export default Header;
