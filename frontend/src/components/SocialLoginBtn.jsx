/* eslint-disable react/prop-types */
import { BACKEND_DOMAIN } from "../constants";

const SocialLoginBtn = ({ login }) => {
  const loginUrl = BACKEND_DOMAIN + "/accounts/google/login/";

  const handleLogin = async () => {
    try {
      window.location.href = loginUrl;
    } catch (error) {
      console.error("err getting social login", error);
    }
  };

  return (
    <button
      onClick={handleLogin}
      href={`${loginUrl}`}
      className="flex items-center absolute right-5 top-0 mt-4 justify-center gap-2 max-w-[210px] py-3 px-4 bg-white border border-gray-300 rounded-lg shadow hover:shadow-md transition-all"
    >
      <img
        className="w-5 h-5"
        src="https://cdn-icons-png.flaticon.com/256/720/720255.png"
        alt="Google logo"
      />
      {login ? "Login" : "Signup"} With Google
    </button>
  );
};

export default SocialLoginBtn;
