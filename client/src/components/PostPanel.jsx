import React, { useState } from "react";

import { Avatar } from "@mui/material";

import PostForm from "./PostForm";
import { blankAvatar } from "../assets";
import { useStateContext } from "../contexts/ContextProvider";
import { POST_CREATION } from "../constants/common";

const PostPanel = ({ className }) => {
    const [showPostForm, setShowPostForm] = useState(false);

    const { postType, setPostType } = useStateContext();

    const handleShowPostForm = () => {
        setShowPostForm(true);
        setPostType(POST_CREATION);
    }
  return (
    <>
      <div className="w-full flex justify-center">
        <div
          className={`${className} max-sm:w-full sm:w-150 p-4 bg-white rounded-md drop-shadow-sm shadow-sm`}
        >
          <div className="w-full flex">
            <Avatar
              src={blankAvatar}
              alt="avatar"
              sx={{ width: 40, height: 40 }}
            />
            <div onClick={handleShowPostForm} className="flex-1 flex items-center ml-4 bg-gray rounded-3xl cursor-pointer hover:bg-gray-2">
              <span className="ml-3 text-dark-gray">Bạn đang nghĩ gì thế?</span>
            </div>
          </div>
        </div>
      </div>

      {/* Post form popup */}
      <PostForm type={postType} show={showPostForm} setShow={setShowPostForm} />
    </>
  );
};

export default PostPanel;
