import { Outlet, Link } from "react-router-dom";
import {
  AppBar,
  ListItemIcon,
  IconButton,
  Stack,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import StorefrontIcon from "@mui/icons-material/Storefront";

import { useState } from "react";

const Footer = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const fetchFooterContent = useEffect() => {
    const url = 'site-content/footer-disclaimer'
    api.get(url)
  }
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const open = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="footer">
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            component={Link}
            to="/"
            edge="start"
            aria-label="logo"
            style={{ color: "white", marginRight: "auto" }}
          >
            <StorefrontIcon />
            <Typography
              variant="h6"
              component="div"
              style={{ paddingLeft: ".5rem" }}
            >
              Marketify
            </Typography>
          </IconButton>
          <Stack direction="row" spacing={2}>
            <MenuItem component={Link} to="/">
              Home
            </MenuItem>
            <MenuItem
              component={Link}
              to="/"
              onClick={handleClick}
              endicon={<KeyboardArrowDownIcon />}
            >
              Products
              <ListItemIcon
                style={{ minWidth: 0, marginLeft: "auto", color: "white" }}
              >
                <ArrowDropDownIcon />
              </ListItemIcon>
            </MenuItem>
            <MenuItem component={Link} to="/profile/">
              Profile
            </MenuItem>
            <MenuItem component={Link} to="/contact">
              Contact
            </MenuItem>
            <Menu
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "center" }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              <MenuItem to="/products/category/tech" component={Link}>
                Tech
              </MenuItem>
              <MenuItem to="/products/category/sport" component={Link}>
                Sports
              </MenuItem>
            </Menu>
          </Stack>
        </Toolbar>
        <Outlet />
      </AppBar>
      <div className="footer-text-block">
        <p className="footer-text">
          Marketify is an ecommerce platform built in Django and React. &copy;
        </p>
        <p className="footer-text">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industries standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </p>
      </div>
    </div>
  );
};

export default Footer;
