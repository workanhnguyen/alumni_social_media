import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { Avatar } from "@mui/material";
import PublicIcon from "@mui/icons-material/Public";

import { blankAvatar } from "../assets";
import { useStateContext } from "../contexts/ContextProvider";

const PostCreatorInfo = ({ post }) => {
  const { setPostDetail } = useStateContext();

  const navigate = useNavigate();

  const handleNavigateToPostDetailPage = () => {
    setPostDetail(post);
    navigate(`/posts/${post?.id}`);
  };

  return (
    <div className="w-fit flex items-center">
      <Link to={`/${post?.user?.username}`}>
        <Avatar
          src={blankAvatar}
          alt="avatar"
          sx={{ width: 40, height: 40 }}
          className="cursor-pointer"
        />
      </Link>
      <div className="flex-1 flex flex-col justify-center ml-2 gap-y-1">
        <Link
          to={`/${post?.user?.username}`}
          className="font-semibold hover:underline cursor-pointer"
        >{`${post?.user?.first_name} ${post?.user?.last_name}`}</Link>
        <div className="flex items-center text-dark-gray">
          <span
            onClick={handleNavigateToPostDetailPage}
            className="text-xs hover:underline cursor-pointer"
          >
            {post?.timestamp}
          </span>
          <PublicIcon fontSize="inherit" className="ml-1.5 mb-0.5" />
        </div>
      </div>
    </div>
  );
};

export default PostCreatorInfo;
