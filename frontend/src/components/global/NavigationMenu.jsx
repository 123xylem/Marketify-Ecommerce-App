/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { useState } from "react";
import { FaArrowDown } from "react-icons/fa";
import { TbHexagonLetterM } from "react-icons/tb";
import { motion } from "framer-motion";

const NavigationMenu = ({ categories, header = false }) => {
  const [showSubMenu, setShowSubMenu] = useState([]);
  const [modalHovered, setModalHovered] = useState(false);

  const variants = {
    open: {
      width: "max-content",
    },
    closed: { fontSize: "0px" },
  };

  const leaveMenu = () => {
    setTimeout(() => {
      setModalHovered(false);
    }, 300);
  };

  const subMenuOnClick = (e, subMenuId) => {
    e.preventDefault();
    setShowSubMenu((prev) => {
      let arr = [...prev];
      arr[subMenuId] = !arr[subMenuId];
      return arr;
    });
  };

  let navMenus = document.querySelector(".nav-menu-ul-header") || false;

  const hideNavMenus = (event) => {
    if (navMenus === null || !navMenus) {
      return;
    }
    if (!navMenus.contains(event.target) && event.target !== navMenus) {
      navMenus.classList.add("hidden");
    }
  };

  document.addEventListener("touchstart", hideNavMenus);

  const handleNavClick = () => {
    event.stopPropagation();
    navMenus.classList.toggle("hidden");
  };

  return (
    <nav className="flex min-h-[25px] relative">
      {header && (
        <>
          <div className="flex justify-between relative z-50 sm:hidden flex">
            <Link
              to="/"
              className="flex justify-between items-center w-full flex-nowrap  gap-2 font-bold"
            >
              <TbHexagonLetterM color="white" size="42" />
            </Link>
          </div>

          <button
            onClick={handleNavClick}
            className="md:hidden  flex-col  flex text-white z-100"
            id={`hamburger-icon${header ? "-header" : ""}`}
          >
            <span className="block w-6 h-1 bg-white mb-1"></span>
            <span className="block w-6 h-1 bg-white mb-1"></span>
            <span className="block w-6 h-1 bg-white"></span>
          </button>
        </>
      )}
      <ul
        className={`nav-menu-ul${header ? "-header hidden flex-col sm:static bg-black items-start justify-start max-w-full md:pl-0 p-4 md:pb-0 fixed left-10 top-5 z-50 " : " items-center px-0 "} flex   md:pt-0   
          gap-4 w-full text-white bordered text-white max-w-max md:flex-row md:flex md:items-center md:bg-transparent md:max-w-auto`}
      >
        <div className="flex justify-between relative z-50 hidden sm:flex">
          <Link
            to="/"
            className="flex justify-between items-center w-full flex-nowrap  gap-2 font-bold"
          >
            <TbHexagonLetterM color="white" size="42" />
            <h6 className="text-[#fff] text-base text-xl sm:text-2xl ">
              Marketify
            </h6>
          </Link>
        </div>
        {header && (
          <div className="relative flex products-modal-menu">
            <ul
              onMouseEnter={() => setModalHovered(true)}
              key={999}
              className="relative  items-center"
            >
              <Link to="/" className="nav-link-parent sm:text-md ">
                Products
              </Link>
              {modalHovered && (
                <motion.ul
                  variants={variants}
                  animate={modalHovered ? "open" : "closed"}
                  onMouseEnter={() => setModalHovered(true)}
                  onMouseLeave={() => leaveMenu()}
                  className="absolute z-50  flex-col text-black bg-white sm:text-md min-w-min justify-center items-start h-max-h border gap-2 left-20 md:left-5 md:top-7 top-1 py-4 px-4 flex flex-col"
                >
                  {categories
                    ?.filter((cat) => cat.parent == null)
                    .map((el) => {
                      if (!el.child_cats) {
                        return (
                          <li key={el.id}>
                            <Link
                              to={`/products/category/${el.title}`}
                              className="header-nav-link bg-white py-2 "
                            >
                              <span>{el.title} </span>
                            </Link>
                          </li>
                        );
                      }

                      return (
                        <ul key={el.id} className="header-nav-options  ">
                          <li key={el.id} className="sub-menu-li">
                            <Link
                              to={`/products/category/${el.title}`}
                              className="sub-menu-link sm:text-md"
                            >
                              <div className="flex items-center sm:text-md">
                                {el.title}
                                <div
                                  className="pl-2 py-2 z-100 sm:text-md"
                                  onClick={(e) => subMenuOnClick(e, el.id)}
                                >
                                  <FaArrowDown size={12} />
                                </div>
                              </div>
                            </Link>
                          </li>
                          <motion.ul variants={variants}>
                            {showSubMenu[el.id] &&
                              el.child_cats.map((ele) => {
                                return (
                                  <li
                                    key={ele.id}
                                    className="sub-menu-li pl-4 py-1 sm:text-md"
                                  >
                                    <Link
                                      to={`/products/category/${ele.title}`}
                                      className="sub-menu-link "
                                    >
                                      <span className=""> - {ele.title}</span>
                                    </Link>
                                  </li>
                                );
                              })}
                          </motion.ul>
                        </ul>
                      );
                    })}
                </motion.ul>
              )}
            </ul>
          </div>
        )}
        <Link
          to="/profile/"
          className="nav-link-parent flex w-full z-50 flex-1 "
        >
          Profile
        </Link>
        <Link
          to="/contact"
          className="nav-link-parent flex w-full z-200 flex-1 "
        >
          Contact
        </Link>
      </ul>
    </nav>
  );
};

export default NavigationMenu;
