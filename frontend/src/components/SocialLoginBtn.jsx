import {
  BACKEND_DOMAIN,
  VITE_OAUTH_CLIENT_ID,
  VITE_OAUTH_CALLBACK_URL,
} from "../constants";

import api from "../api";
console.log(VITE_OAUTH_CALLBACK_URL);
const SocialLoginBtn = () => {
  const loginUrl = BACKEND_DOMAIN + "/accounts/";
  // let url = `https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=http://127.0.0.1:5173/login&prompt=consent&response_type=code&client_id=${VITE_OAUTH_CLIENT_ID}&scope=openid%20email%20profile&access_type=offline`;
  let url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=92879841326-r1j75jel3j7i4hdm6g2vmlgd79kuic69.apps.googleusercontent.com&redirect_uri=http%3A%2F%2F127.0.0.1%3A8000%2Faccounts%2Fgoogle%2Flogin%2Fcallback%2F&scope=email+profile&response_type=code&state=D4wWt6pXQ0hZO1YM&access_type=online`;

  // let url = BACKEND_DOMAIN + "/auth/google/";
  const handleLogin = async () => {
    try {
      window.location.href = "http://127.0.0.1:8000/accounts/google/login/";

      // const res = await fetch(url).then((res) => console.log(res));
      // alert(res).catch((err) => {
      //   console.log(err, "is err");
      // });

      // api.post("http://127.0.0.1:8000/auth/provider/redirect", {
      //   provider: "google",
      //   process: "login",
      //   callback_url: " /account/provider/callback",
      // });

      // const response = await fetch(url);
      // console.log(response);
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
