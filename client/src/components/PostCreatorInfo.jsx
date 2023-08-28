import React from "react";
import { Link, useNavigate } from "react-router-dom";
import moment from 'moment';
import "moment/locale/vi";

import { Avatar } from "@mui/material";
import PublicIcon from "@mui/icons-material/Public";

import { useStateContext } from "../contexts/ContextProvider";


moment.locale("vi");
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
          src={post?.user?.avatar}
          alt="avatar"
          sx={{ width: 40, height: 40 }}
          className="cursor-pointer"
        />
      </Link>
      <div className="flex-1 flex flex-col justify-center ml-2">
        <Link
          to={`/${post?.user?.username}`}
          className="font-semibold hover:underline cursor-pointer"
        >{`${post?.user?.lastName} ${post?.user?.firstName}`}</Link>
        <div className="flex items-center text-dark-gray">
          <span
            onClick={handleNavigateToPostDetailPage}
            className="text-xs hover:underline cursor-pointer"
          >
            {moment(post?.createdAt).fromNow()}
          </span>
          <PublicIcon fontSize="inherit" className="ml-1.5" />
        </div>
      </div>
    </div>
  );
};

export default PostCreatorInfo;
