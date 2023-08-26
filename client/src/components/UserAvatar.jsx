import React from "react";

import { Avatar } from "@mui/material";
import CameraAltIcon from '@mui/icons-material/CameraAlt';

const UserAvatar = ({ avatar }) => {
  return (
    <div className="relative w-44 h-44 flex justify-center items-center rounded-full bg-white -mt-8 max-lg:-mt-20 cursor-pointer">
      <Avatar
        src={avatar}
        alt="avatar"
        sx={{ width: 168, height: 168 }}
        className="rounded-full"
      />
      {/* Edit avatar icon */}
      <div className="absolute bottom-2 right-3 w-9 h-9 flex justify-center items-center rounded-full bg-gray-4">
        <CameraAltIcon className="mt-1" />
      </div>
    </div>
  );
};

export default UserAvatar;
