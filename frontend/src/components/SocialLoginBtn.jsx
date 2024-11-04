import { BACKEND_DOMAIN } from "../constants";

const SocialLoginBtn = () => {
  const loginUrl = BACKEND_DOMAIN + "/accounts/google/login/";

  const handleLogin = async () => {
    try {
      window.location.href = loginUrl;
    } catch (error) {
      console.error("err getting social login", error);
    }
  };

  return (
    <button onClick={handleLogin} href={`${loginUrl}`} className="social-login">
      Login With Google
    </button>
  );
};

export default SocialLoginBtn;
