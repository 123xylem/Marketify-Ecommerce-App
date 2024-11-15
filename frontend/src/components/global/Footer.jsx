/* eslint-disable react/prop-types */
// import { Outlet, Link } from "react-router-dom";
import api from "../../api";
import NavigationMenu from "./NavigationMenu";
import { useQuery } from "@tanstack/react-query";

const Footer = () => {
  const {
    isLoading: isFooterLoading,
    isError: isFooterError,
    data: footerData,
    error: footerError,
  } = useQuery({
    queryKey: ["footer-content"],
    queryFn: async () => {
      const response = await api.get("site-content/footer-disclaimer");
      if (!response.status) {
        throw new Error("Network response was not ok");
      }
      return await response.data;
    },
    staleTime: 60 * 1000 * 60,
    cacheTime: 60 * 1000 * 60 * 24,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    meta: { persist: true },
  });
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
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    meta: { persist: true },
  });

  return (
    <div className=" p-4 bg-blue-800 sm:p-8 flex flex-col ">
      <div className="flex flex-col justify-center container mx-auto content-center gap-4">
        {!isCategoryLoading && !isCategoryError && (
          <>{<NavigationMenu categories={CategoryData} />}</>
        )}
        <div className="footer-text-block ">
          <p className="footer-text">
            Marketify is an ecommerce platform built in Django and React. &copy;
          </p>
          {isFooterLoading && <span>Loading footer content...</span>}
          {isFooterError && <span>Error: {footerError.message}</span>}
          {!isFooterLoading && !isFooterError && (
            <>
              <p className="footer-text">{footerData?.content.content}</p>
              {footerData?.content.image && (
                <img src={footerData?.content.image} alt="Footer" />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Footer;
