import { useEffect, useState, useMemo } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import SocialLoginBtn from "../components/SocialLoginBtn";
import api from "../api";
import { useSearchParams } from "react-router-dom";
import { ResponseMessage } from "../components/ResponseMessage";
import { redirectToCartIfCartItem } from "../utils";
const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  padding: 20,
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
    ...theme.applyStyles("dark", {
      backgroundImage:
        "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
    }),
  },
}));

export default function SignIn(props) {
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [authError, setAuthError] = useState(false);
  const [open, setOpen] = useState(false);
  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get("emid_code");
  //Fetch Token if redirected to login page with emidCode
  useEffect(() => {
    if (searchTerm) {
      api
        .post(`/accountprofile/auth/token/retrieve/`, {
          em_id: searchTerm,
        })
        .then((response) => {
          // console.log(response);
          const data = response.data;
          // alert(JSON.stringify(data));
          localStorage.setItem("access-token", data.success.access);
          localStorage.setItem("refresh-token", data.success.refresh);
          localStorage.setItem("username", data.username);
          localStorage.setItem("userID", data.userID);
        })
        .finally(() => {
          window.location.replace("/");
        })
        .catch((error) => console.error("Failed to retrieve JWT:", error));
    }
  }, [searchTerm]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function handleSubmit() {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    // console.log(email, password);
    let bodyContent = JSON.stringify({
      email,
      password,
    });
    try {
      let response = await api.post("/accountprofile/token/", bodyContent);

      if (response && response.status === 200) {
        let responseData = response.data;
        let {
          refresh: refreshToken,
          access: accessToken,
          user: username,
          id: userID,
        } = responseData;

        localStorage.setItem("refresh-token", refreshToken);
        localStorage.setItem("access-token", accessToken);
        localStorage.setItem("username", username);
        localStorage.setItem("userID", userID);
        redirectToCartIfCartItem();
      }
    } catch (err) {
      console.log(err, "err");

      if (err.response?.data?.detail) {
        setPasswordError(true);
        setPasswordErrorMessage(err.response.data.detail);
        setEmailError(true);
        setEmailErrorMessage(err.response.data.detail);
        setErrorMessage(err.response.data.detail);
        setAuthError(true);
        console.log("Setting email error:", err.response.data.detail);
      }
      console.error("Failed to Login: ", err);
    }
  }

  const validateInputs = (e) => {
    e.preventDefault();
    const email = document.getElementById("email");
    const password = document.getElementById("password");

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    if (!password.value || password.value.length < 3) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 3 characters long.");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    if (isValid) {
      handleSubmit();
    }
    return false;
  };

  return (
    <div>
      {/* <CssBaseline enableColorScheme /> */}
      <SignInContainer direction="column" justifyContent="space-between">
        <ResponseMessage message={""} err={errorMessage}></ResponseMessage>

        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={(e) => validateInputs(e)}
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: 2,
            }}
          >
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                error={emailError}
                helperText={emailErrorMessage}
                id="email"
                type="email"
                name="email"
                placeholder="your@email.com"
                autoComplete="email"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={emailError ? "error" : "primary"}
                sx={{ ariaLabel: "email" }}
              />
            </FormControl>
            <FormControl>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <FormLabel htmlFor="password">Password</FormLabel>
              </Box>
              <TextField
                error={passwordError}
                helperText={passwordErrorMessage}
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="current-password"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={passwordError ? "error" : "primary"}
              />
            </FormControl>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            {/* <ForgotPassword open={open} handleClose={handleClose} /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={(e) => validateInputs(e)}
            >
              Login
            </Button>
            <Typography sx={{ textAlign: "center" }}>
              Don&apos;t have an account?{" "}
              <span>
                <Link
                  href="/register/"
                  variant="body2"
                  sx={{ alignSelf: "center" }}
                >
                  Register
                </Link>
              </span>
            </Typography>
          </Box>
        </Card>
        <SocialLoginBtn login={true} />
      </SignInContainer>
    </div>
  );
}
