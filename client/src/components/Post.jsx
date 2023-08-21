import React, { useState } from "react";

import {
  Avatar,
  Divider,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import PublicIcon from '@mui/icons-material/Public';
import EditIcon from '@mui/icons-material/Edit';
import CommentsDisabledIcon from '@mui/icons-material/CommentsDisabled';
import DeleteIcon from '@mui/icons-material/Delete';

import { actionHaha, blankAvatar } from "../assets";
import { Link } from "react-router-dom";
import loggedInUser from "../data/user";
import { POST_EDITION } from "../constants/common";
import { useStateContext } from "../contexts/ContextProvider";
import EditPostForm from "./EditPostForm";

const user = loggedInUser;

const Post = ({ data, className }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [showEditPostForm, setShowEditPostForm] = useState(false);
  const open = Boolean(anchorEl);

  const { postType, setPostType } = useStateContext();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleShowEditPostForm = () => {
    setShowEditPostForm(true);
    setPostType(POST_EDITION);
    handleClose();
  }
  return (
    <>
      <div
        className={`${className} max-sm:full pt-4 pb-1 mt-3 bg-white rounded-md drop-shadow-sm`}
      >
        {/* Post common info */}
        <div className="w-full flex justify-between px-4">
          {/* User info */}
          <div className="w-fit flex items-center">
            <Link to={`/${user.username}`}>
              <Avatar
                src={blankAvatar}
                alt="avatar"
                sx={{ width: 40, height: 40 }}
                className="cursor-pointer"
              />
            </Link>
            <div className="flex-1 flex flex-col justify-center ml-2 gap-y-1">
              <Link
                to={`/${user.username}`}
                className="font-semibold hover:underline cursor-pointer"
              >{`${data.user.first_name} ${data.user.last_name}`}</Link>
             <div className="flex items-center text-dark-gray">
                <span className="text-xs">{data.timestamp}</span>
                <PublicIcon fontSize="inherit" className="ml-1.5 mb-0.5" />
             </div>
            </div>
          </div>
  
          {/* Actions */}
          <div
            className="w-fit flex items-center px-2.5 py-1 cursor-pointer hover:rounded-full hover:bg-gray active:bg-gray-2"
            aria-controls={open ? "post-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <MoreHorizIcon />
          </div>
        </div>
  
        {/* Post content */}
        <div
          className="w-full my-3 px-4"
          dangerouslySetInnerHTML={{ __html: data.content }}
        />
        {/* Post images */}
        {data.image && (
          <div className="w-full">
            <img src={data.image} alt="" />
          </div>
        )}
        {/* Post reaction quantities */}
        <div className="w-full flex justify-between px-4 py-3">
          {/* Like */}
          <div className="w-fit flex items-center">
            <Avatar src={actionHaha} sx={{ width: 18, height: 18 }} />
            <span className="ml-1 text-dark-gray text-sm">
              Bạn, Văn Mãi và 100 người khác
            </span>
          </div>
          {/* Comment */}
          <div className="w-fit flex items-center">
            <ChatBubbleOutlineOutlinedIcon
              className="text-dark-gray"
              fontSize="small"
            />
            <span className="text-sm text-dark ml-1 -mt-1">79</span>
          </div>
        </div>
        <Divider variant="middle" />
        {/* Post reacting action */}
        <div className="w-full flex justify-center items-center gap-x-1 mt-2">
          <div className="w-fit flex items-center px-10 py-2 hover:bg-gray active:bg-gray-2 rounded-md cursor-pointer">
            <Avatar src={actionHaha} sx={{ width: 18, height: 18 }} />
            <span className="text-sm text-dark-gray ml-1 font-semibold">
              Haha
            </span>
          </div>
          <div className="w-fit flex items-center px-6 py-2 hover:bg-gray active:bg-gray-2 rounded-md cursor-pointer">
            <ChatBubbleOutlineOutlinedIcon
              fontSize="small"
              className="text-dark-gray -mb-0.5"
            />
            <span className="text-sm text-dark-gray ml-1 font-semibold">
              Bình luận
            </span>
          </div>
          <div className="w-fit flex items-center px-8 py-2 hover:bg-gray active:bg-gray-2 rounded-md cursor-pointer">
            <ReplyOutlinedIcon fontSize="small" className="text-dark-gray" />
            <span className="text-sm text-dark-gray ml-1 font-semibold">
              Chia sẻ
            </span>
          </div>
        </div>
  
        {/* Post menu action popup */}
        <Menu
          id="post-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleShowEditPostForm}>
            <ListItemIcon>
              <EditIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Chỉnh sửa bài viết</ListItemText>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <CommentsDisabledIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Khóa bình luận</ListItemText>
          </MenuItem>
          <Divider />
          <MenuItem>
            <ListItemIcon>
              <DeleteIcon fontSize="small" className="text-red" />
            </ListItemIcon>
            <ListItemText className="text-red">Xóa bài viết</ListItemText>
          </MenuItem>
        </Menu>
      </div>
      {/* Post form popup */}
      <EditPostForm type={postType} data={data} show={showEditPostForm} setShow={setShowEditPostForm} />
    </>
  );
};

export default Post;
