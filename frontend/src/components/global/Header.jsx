/* eslint-disable react/prop-types */
// import { useEffect, useState } from "react";
import NavigationMenu from "../NavigationMenu";
import SearchBar from "../SearchBar";
import api from "../../api";
import { useQuery } from "@tanstack/react-query";

const Header = () => {
  const username = localStorage.getItem("username") || "Guest";
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
    <div className="nav-container bg-blue-800 ">
      <div className="inner container mx-auto px-4 py-8 flex gap-4 sm:gap-8  justify-between flex-wrap">
        {!isCategoryLoading && !isCategoryError && (
          <>{<NavigationMenu categories={CategoryData} />}</>
        )}

        <SearchBar />
        <div className="user-welcome">Hello {username}</div>
      </div>
    </div>
  );
};

export default Header;
