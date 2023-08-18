import React from "react";

import { Avatar, Divider } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';

import { actionHaha, blankAvatar } from "../assets";

const Post = ({ data }) => {
  return (
      <div
        className={`max-sm:w-full sm:w-128 pt-4 pb-1 mt-3 bg-white rounded-md drop-shadow-sm shadow-sm`}
      >
        {/* Post common info */}
        <div className="w-full flex justify-between px-4">
          {/* User info */}
          <div className="w-fit flex items-center">
            <Avatar
              src={blankAvatar}
              alt="avatar"
              sx={{ width: 40, height: 40 }}
            />
            <div className="flex-1 flex flex-col justify-center ml-2 gap-y-1">
              <span className="font-semibold">{`${data.user.first_name} ${data.user.last_name}`}</span>
              <span className="text-xs">{data.timestamp}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="w-fit flex items-center px-2.5 py-1 cursor-pointer hover:rounded-full hover:bg-gray">
            <MoreHorizIcon />
          </div>
        </div>

        {/* Post content */}
        <div className="w-full my-3 px-4" dangerouslySetInnerHTML={{ __html: data.content }} />
        {/* Post images */}
        <div className="w-full">
            <img src={data.image} alt="" />
        </div>
        {/* Post reaction quantities */}
        <div className="w-full flex justify-between px-4 py-3">
            {/* Like */}
            <div className="w-fit flex items-center">
                <Avatar src={actionHaha} sx={{ width: 18, height: 18 }} />
                <span className="ml-1 text-dark-gray text-sm">Bạn, Văn Mãi và 100 người khác</span>
            </div>
            {/* Comment */}
            <div className="w-fit flex items-center">
                <ChatBubbleOutlineOutlinedIcon className="text-dark-gray" fontSize="small" />
                <span className="text-sm text-dark ml-1 -mt-1">79</span>
            </div>
        </div>
        <Divider variant="middle" />
        {/* Post reacting action */}
        <div className="w-full flex justify-center items-center gap-x-1 mt-2">
            <div className="w-fit flex items-center px-10 py-2 hover:bg-gray rounded-md">
                <Avatar src={actionHaha} sx={{ width: 18, height: 18 }} />
                <span className="text-sm text-dark-gray ml-1 font-semibold">Haha</span>
            </div>
            <div className="w-fit flex items-center px-6 py-2 hover:bg-gray rounded-md">
                <ChatBubbleOutlineOutlinedIcon fontSize="small" className="text-dark-gray -mb-0.5" />
                <span className="text-sm text-dark-gray ml-1 font-semibold">Bình luận</span>
            </div>
            <div className="w-fit flex items-center px-8 py-2 hover:bg-gray rounded-md">
                <ReplyOutlinedIcon fontSize="small" className="text-dark-gray rotate-180" />
                <span className="text-sm text-dark-gray ml-1 font-semibold">Chia sẻ</span>
            </div>
        </div>
      </div>
  );
};

export default Post;
