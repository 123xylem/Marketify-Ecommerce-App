/* eslint-disable react/prop-types */
// import { useEffect, useState } from "react";
import NavigationMenu from "./NavigationMenu";
import SearchBar from "./SearchBar";
import api from "../../api";
import { useQuery } from "@tanstack/react-query";
import UserWelcome from "../UserWelcome";

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
      {/* TODO://Remove breakpoints here  */}
      <div className="fixed top-0 right-0 m-8 flex items-center justify-center rounded-full text-[20px] bg-gray-900 px-3 py-2 text-white">
        <span className="block sm:hidden">base</span>
        <span className="hidden sm:block md:hidden">sm</span>
        <span className="hidden md:block lg:hidden">md</span>
        <span className="hidden lg:block xl:hidden">lg</span>
        <span className="hidden xl:block 2xl:hidden">xl</span>
        <span className="hidden 2xl:block">2xl</span>
      </div>
      <div className="inner container mx-auto px-4 py-8 flex gap-4 sm:gap-8 flex-wrap">
        {!isCategoryLoading && !isCategoryError && (
          <NavigationMenu categories={CategoryData} />
        )}
        <SearchBar />
        <UserWelcome username={username} />
      </div>
    </div>
  );
};

export default Header;
