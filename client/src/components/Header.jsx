import React, { useState } from "react";
import { Link } from "react-router-dom";

import {
  Avatar,
  Container,
  Divider,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import GroupIcon from "@mui/icons-material/Group";
import EmailIcon from "@mui/icons-material/Email";
import VisibilityIcon from "@mui/icons-material/Visibility";
import LogoutIcon from "@mui/icons-material/Logout";

import { blankAvatar, logo1, logo2 } from "../assets";
import { GROUP, HOME, LETTER } from "../constants/page";
import { useStateContext } from "../contexts/ContextProvider";
import loggedInUser from "../data/user";

const user = loggedInUser;

const Header = () => {
  const { pageContent, setPageContent } = useStateContext();

  const handleIconClick = (iconName) => {
    setPageContent(iconName);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="w-full fixed z-10 h-16 flex items-center bg-white drop-shadow-md">
      <Container>
        <div className="flex justify-between items-center">
          <div>
            <img src={logo1} alt="Logo OU" className="max-lg:hidden w-44" />
            <img src={logo2} alt="Logo OU" className="lg:hidden w-16" />
          </div>

          <div className="w-full absolute left-0 right-0 flex justify-center">
            <Link
              to="/dashboard"
              className={`max-md:px-3 px-8 py-1 max-sm:mx-2 mx-4 rounded-lg cursor-pointer ${
                pageContent === HOME ? "text-primary" : "text-dark-gray"
              } hover:bg-gray`}
              onClick={() => handleIconClick(HOME)}
            >
              <HomeIcon fontSize="large" />
            </Link>
            <Link
              to="/groups"
              className={`max-md:px-3 px-8 py-1 max-sm:mx-2 mx-4 rounded-lg cursor-pointer ${
                pageContent === GROUP ? "text-primary" : "text-dark-gray"
              } hover:bg-gray`}
              onClick={() => handleIconClick(GROUP)}
            >
              <GroupIcon fontSize="large" />
            </Link>
            <Link
              to="/letters"
              className={`max-md:px-3 px-8 py-1 max-sm:mx-2 mx-4 rounded-lg cursor-pointer ${
                pageContent === LETTER ? "text-primary" : "text-dark-gray"
              } hover:bg-gray`}
              onClick={() => handleIconClick(LETTER)}
            >
              <EmailIcon fontSize="large" />
            </Link>
          </div>
          {/* Avatar */}
          <div className="w-fit flex justify-end items-center">
            <div className="md:flex md:items-center md:bg-gray md:px-4 md:py-2 md:rounded-md">
              <p className="mr-2 font-semibold max-md:hidden">Anh Nguyễn</p>
              <Avatar
                aria-controls={open ? "user-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                sx={{ width: 35, height: 35 }}
                alt="User Avatar"
                src={blankAvatar}
                className="cursor-pointer"
              />
            </div>

            <Menu
              id="user-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <Link to={`/${user.username}`}>
                <MenuItem>
                  <ListItemIcon>
                    <VisibilityIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Xem trang cá nhân</ListItemText>
                </MenuItem>
              </Link>
              <div className="my-2">
                <Divider />
              </div>
              <MenuItem>
                <ListItemIcon>
                  <LogoutIcon fontSize="small" className="text-red" />
                </ListItemIcon>
                <ListItemText className="text-red">Đăng xuất</ListItemText>
              </MenuItem>
            </Menu>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Header;
