import React from "react";
import { Link } from "react-router-dom";

import { Avatar, Container } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import GroupIcon from "@mui/icons-material/Group";
import EmailIcon from "@mui/icons-material/Email";

import { blankAvatar, logo1, logo2 } from "../assets";
import { GROUP, HOME, LETTER } from "../constants/Role";
import { useStateContext } from "../contexts/ContextProvider";

const Header = () => {
  const { pageContent, setPageContent } = useStateContext();

  const handleIconClick = (iconName) => {
    setPageContent(iconName);
  };

  return (
    <div className="w-full h-16 flex items-center bg-white drop-shadow-md">
      <Container>
        <div className="flex justify-between items-center">
          <div>
            <Link to="/dashboard">
              <img src={logo1} alt="Logo OU" className="max-sm:hidden w-44" />
              <img src={logo2} alt="Logo OU" className="sm:hidden w-16" />
            </Link>
          </div>

          <div className="w-fit flex">
            <div
              className={`max-md:px-3 px-8 py-1 max-sm:mx-2 mx-4 rounded-lg cursor-pointer ${
                pageContent === HOME ? "text-primary" : "text-dark-gray"
              } hover:bg-gray`}
              onClick={() => handleIconClick(HOME)}
            >
              <HomeIcon fontSize="large" />
            </div>
            <div
              className={`max-md:px-3 px-8 py-1 max-sm:mx-2 mx-4 rounded-lg cursor-pointer ${
                pageContent === GROUP ? "text-primary" : "text-dark-gray"
              } hover:bg-gray`}
              onClick={() => handleIconClick(GROUP)}
            >
              <GroupIcon fontSize="large" />
            </div>
            <div
              className={`max-md:px-3 px-8 py-1 max-sm:mx-2 mx-4 rounded-lg cursor-pointer ${
                pageContent === LETTER ? "text-primary" : "text-dark-gray"
              } hover:bg-gray`}
              onClick={() => handleIconClick(LETTER)}
            >
              <EmailIcon fontSize="large" />
            </div>
          </div>

          <div className="w-fit flex justify-end items-center">
            <Avatar
              sx={{ width: 40, height: 40 }}
              alt="Remy Sharp"
              src={blankAvatar}
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Header;
