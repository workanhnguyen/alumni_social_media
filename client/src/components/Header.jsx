import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { Avatar, Container, Menu, MenuItem } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import GroupIcon from "@mui/icons-material/Group";
import EmailIcon from "@mui/icons-material/Email";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

import { blankAvatar, logo1, logo2 } from "../assets";
import { GROUP, HOME, LETTER } from "../constants/page";
import { useStateContext } from "../contexts/ContextProvider";
import PopupState, { bindMenu, bindTrigger } from "material-ui-popup-state";

const Header = () => {
  const { pageContent, setPageContent, user } = useStateContext();

  const navigate = useNavigate();

  const handleIconClick = (iconName) => {
    setPageContent(iconName);
  };

  const handleLogout = () => {
    navigate('/', { replace: true })
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

          <PopupState variant="popover" popupId="demo-popup-menu">
            {(popupState) => (
              <>
                <div
                  {...bindTrigger(popupState)}
                  className="w-fit flex justify-end items-center"
                >
                  <div className="md:flex md:items-center md:bg-gray md:px-4 md:py-2 md:rounded-md">
                    <p className="mr-2 font-semibold max-md:hidden">
                      Anh Nguyễn
                    </p>
                    <Avatar
                      sx={{ width: 35, height: 35 }}
                      alt="User Avatar"
                      src={blankAvatar}
                      className="cursor-pointer"
                    />
                  </div>
                </div>
                <Menu
                  anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                  transformOrigin={{ vertical: "top", horizontal: "center" }}
                  elevation={2}
                  {...bindMenu(popupState)}
                >
                  <MenuItem onClick={popupState.close}>
                    <Link to={`/${user?.username}`} className="flex items-center">
                      <AccountCircleOutlinedIcon fontSize="small" />
                      <span className="ml-2">Xem trang cá nhân</span>
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={popupState.close}>
                    <div onClick={handleLogout} className="flex items-center text-red">
                      <LogoutOutlinedIcon fontSize="small" />
                      <span className="ml-2">Đăng xuất</span>
                    </div>
                  </MenuItem>
                </Menu>
              </>
            )}
          </PopupState>
        </div>
      </Container>
    </div>
  );
};

export default Header;
