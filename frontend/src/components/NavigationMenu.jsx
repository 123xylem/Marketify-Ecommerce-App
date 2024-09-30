import { Outlet, Link } from "react-router-dom";
import {
  AppBar,
  Button,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import StorefrontIcon from "@mui/icons-material/Storefront";

const NavigationMenu = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          component={Link}
          to="/"
          edge="start"
          aria-label="logo"
        >
          <StorefrontIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Marketify
        </Typography>
        <Stack direction="row" spacing={2}>
          <Link to="/">Home</Link>
          <Link to="/api/accountprofile/account">Profile</Link>
          <Link to="/contact">Contact</Link>
        </Stack>
        {/* <ul>
          <li></li>
          <li>
            <Link to="/api/accountprofile/account">Profile</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul> */}
      </Toolbar>
      <Outlet />
    </AppBar>
  );
};

export default NavigationMenu;
