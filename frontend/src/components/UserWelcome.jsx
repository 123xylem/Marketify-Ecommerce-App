/* eslint-disable react/prop-types */
import { FaCartShopping } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";

const UserWelcome = ({ username }) => {
  return (
    <div className="user-welcome flex font-semibold items-center gap-4 text-white ">
      <Link to="/cart/" className="nav-link-parent flex">
        <FaCartShopping
          style={{ marginRight: "8px" }}
          color={"white"}
          size={24}
        />
      </Link>
      <Link to="/profile/" className="nav-link-parent items-end flex">
        <p className="sm:flex hidden sm:leading-none mt-auto">Hi {username}</p>
        <FaUserAlt style={{ marginLeft: "8px" }} color={"white"} size={24} />
      </Link>
    </div>
  );
};
export default UserWelcome;
