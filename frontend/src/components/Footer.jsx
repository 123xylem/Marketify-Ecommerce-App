/* eslint-disable react/prop-types */
import { Outlet, Link } from "react-router-dom";
import api from "../api";
import NavigationMenu from "./NavigationMenu";
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

import { useState, useEffect } from "react";

const Footer = (props) => {
  // const [anchorEl, setAnchorEl] = useState(null);
  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };
  // const open = Boolean(anchorEl);
  // const handleClose = () => {
  //   setAnchorEl(null);
  // };
  return (
    <div className="footer">
      <div className="footer-container">
        <NavigationMenu categories={props.categories} />
        <div className="footer-text-block">
          <p className="footer-text">
            Marketify is an ecommerce platform built in Django and React. &copy;
          </p>
          <p className="footer-text">
            {props.content.content}
            <img src={props.content.image} alt="" />
          </p>
        </div>
      </div>
      {/* <AppBar position="static">
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
            <MenuItem component={Link} to="/cart/">
              Cart
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
      </AppBar> */}
    </div>
  );
};

export default Footer;
