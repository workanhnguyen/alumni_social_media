import React from "react";

import { Avatar } from "@mui/material";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";

import { actionHaha } from "../assets";

const PostReactionQuantity = ({ commentQuantity }) => {
  return (
    <div className="w-full flex justify-between px-4 py-3">
      {/* Like quantities */}
      <div className="w-fit flex items-center">
        <Avatar src={actionHaha} sx={{ width: 18, height: 18 }} />
        <span className="ml-1 text-dark-gray text-sm">
          Bạn, Văn Mãi và 100 người khác
        </span>
      </div>
      {/* Comment quantities */}
      <div className="w-fit flex items-center">
        <ChatBubbleOutlineOutlinedIcon
          className="text-dark-gray"
          fontSize="small"
        />
        <span className="text-sm text-dark ml-1 -mt-1">{commentQuantity}</span>
      </div>
    </div>
  );
};

export default PostReactionQuantity;
