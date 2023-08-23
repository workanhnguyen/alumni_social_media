import React, { useState } from "react";

import {
  Divider,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EditIcon from "@mui/icons-material/Edit";
import CommentsDisabledIcon from "@mui/icons-material/CommentsDisabled";
import DeleteIcon from "@mui/icons-material/Delete";

import EditPostForm from "./EditPostForm";
import { commentData } from "../data/commentData";
import {
  CommentSection,
  PostActionSection,
  PostCreatorInfo,
  PostReactionQuantity,
} from "../components";
import PostImageSlider from "./PostImageSlider";
import { POST_DETAIL } from "../constants/common";

const comments = commentData;

const Post = ({ data, className, type }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [showEditPostForm, setShowEditPostForm] = useState(false);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleShowEditPostForm = () => {
    setShowEditPostForm(true);
    handleClose();
  };

  return (
    <>
      <div
        className={`${className} max-sm:full pt-4 pb-1 mt-3 bg-white rounded-md drop-shadow-sm`}
      >
        <div className="w-full flex justify-between px-4">
          {/* Creator info */}
          <PostCreatorInfo post={data} />
          {/* More actions */}
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
          dangerouslySetInnerHTML={{ __html: data?.content }}
        />
        {/* Post images slider */}
        <div className="mt-3">
          <PostImageSlider images={data?.images} />
        </div>
        {/* Post reaction quantity */}
        <PostReactionQuantity commentQuantity={comments.length} />
        <Divider variant="middle" />
        {/* Post action section: like, comment, share */}
        <div className="my-1">
          <PostActionSection />
        </div>
        <Divider variant="middle" />
        {/* Comment section */}
        <div className='mt-3'>
          <CommentSection comments={comments} quantity={type === POST_DETAIL ? comments.length : 1} />
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
      <EditPostForm
        data={data}
        show={showEditPostForm}
        setShow={setShowEditPostForm}
      />
    </>
  );
};

export default Post;
