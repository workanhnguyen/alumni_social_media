import React from "react";


import { Avatar } from "@mui/material";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";

import { actionHaha } from "../assets";
import { Link, useNavigate } from "react-router-dom";

const PostActionSection = ({ postId }) => {
  return (
    <div className="w-full flex justify-center items-center gap-x-1">
      <div className="w-fit flex items-center px-10 py-2 hover:bg-gray active:bg-gray-2 rounded-md cursor-pointer">
        <Avatar src={actionHaha} sx={{ width: 18, height: 18 }} />
        <span className="text-sm text-dark-gray ml-1 font-semibold">Haha</span>
      </div>
      <Link to={`/posts/${postId}`}
        className="w-fit flex items-center px-6 py-2 hover:bg-gray active:bg-gray-2 rounded-md cursor-pointer"
      >
        <ChatBubbleOutlineOutlinedIcon
          fontSize="small"
          className="text-dark-gray -mb-0.5"
        />
        <span className="text-sm text-dark-gray ml-1 font-semibold">
          Bình luận
        </span>
      </Link>
      <div className="w-fit flex items-center px-8 py-2 hover:bg-gray active:bg-gray-2 rounded-md cursor-pointer">
        <ReplyOutlinedIcon fontSize="small" className="text-dark-gray" />
        <span className="text-sm text-dark-gray ml-1 font-semibold">
          Chia sẻ
        </span>
      </div>
    </div>
  );
};

export default PostActionSection;
