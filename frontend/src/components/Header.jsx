/* eslint-disable react/prop-types */
// import { useEffect, useState } from "react";
import NavigationMenu from "./NavigationMenu";
import SearchBar from "./product/SearchBar";
import api from "../api";
import { useQuery } from "@tanstack/react-query";

const Header = () => {
  const {
    isLoading: isCategoryLoading,
    isError: isCategoryError,
    data: CategoryData,
  } = useQuery({
    queryKey: ["get-categories"],
    queryFn: async () => {
      const response = await api.get("/category/");
      if (!response.status) {
        throw new Error("Network response was not ok");
      }
      return await response.data;
    },
    staleTime: 60 * 1000 * 60,
    meta: {
      persist: true,
    },
  });
  return (
    <div className="nav-container">
      {!isCategoryLoading && !isCategoryError && (
        <>{<NavigationMenu categories={CategoryData} />}</>
      )}

      <SearchBar />
    </div>
  );
};

export default Header;
