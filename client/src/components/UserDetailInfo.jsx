import React from "react";

import SchoolIcon from "@mui/icons-material/School";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import { Link } from "react-router-dom";

const UserDetailInfo = () => {
  return (
    <div className="w-full max-sm:w-full max-md:w-4/5 max-lg:w-150 h-fit p-4 bg-white drop-shadow-sm rounded-md">
      <div className="flex justify-between items-center mb-4">
        <p className="text-xl font-bold">Giới thiệu</p>
        <Link
          to="/"
          className="p-2 -my-2 -mr-2 text-primary rounded-md hover:bg-gray"
        >
          Xem chi tiết
        </Link>
      </div>
      <div className="w-full flex items-center text-dark-gray mb-4">
        <SchoolIcon />
        <span className="ml-2">Trường Đại học Mở Thành phố Hồ Chí Minh</span>
      </div>
      <div className="w-full flex items-center text-dark-gray mb-4">
        <SpaceDashboardIcon />
        <span className="ml-2">Khoa Công nghệ thông tin</span>
      </div>
      <div className="w-full flex items-center text-dark-gray mb-4">
        <BookmarkIcon />
        <span className="ml-2">Ngành khoa học máy tính</span>
      </div>
      <div className="w-full flex items-center text-dark-gray">
        <AccessTimeFilledIcon />
        <span className="ml-2">Khóa 2020</span>
      </div>
    </div>
  );
};

export default UserDetailInfo;
