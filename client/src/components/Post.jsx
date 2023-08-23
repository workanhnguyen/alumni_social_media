import React, { useState } from "react";

import {
  Divider,
  Menu,
  MenuItem,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AutoFixHighOutlinedIcon from '@mui/icons-material/AutoFixHighOutlined';
import CommentsDisabledOutlinedIcon from '@mui/icons-material/CommentsDisabledOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

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
import PopupState, { bindMenu, bindTrigger } from "material-ui-popup-state";

const comments = commentData;

const Post = ({ data, className, type }) => {
  const [showEditPostForm, setShowEditPostForm] = useState(false);
  const [showCommentSection, setShowCommentSection] = useState(true);

  const handleShowEditPostForm = () => {
    setShowEditPostForm(true);
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
          <PopupState variant="popover" popupId="demo-popup-menu">
            {(popupState) => (
              <>
                <div
                  {...bindTrigger(popupState)}
                  className="w-fit flex items-center px-3 py-0.5 hover:bg-gray active:bg-gray-2 rounded-full cursor-pointer"
                >
                  <MoreHorizIcon />
                </div>
                <Menu
                  anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                  transformOrigin={{ vertical: "top", horizontal: "center" }}
                  elevation={2}
                  {...bindMenu(popupState)}
                >
                  <MenuItem onClick={popupState.close}>
                    <div onClick={handleShowEditPostForm} className="flex items-center">
                      <AutoFixHighOutlinedIcon fontSize="small" />
                      <span className="ml-2">Chỉnh sửa bài viết</span>
                    </div>
                  </MenuItem>
                  <MenuItem onClick={popupState.close}>
                    <div className="flex items-center">
                      <CommentsDisabledOutlinedIcon fontSize="small" />
                      <span className="ml-2">Khóa bình luận</span>
                    </div>
                  </MenuItem>
                  <MenuItem onClick={popupState.close}>
                    <div className="flex items-center text-red">
                      <DeleteOutlineOutlinedIcon fontSize="small" />
                      <span className="ml-2">Xóa bài viết</span>
                    </div>
                  </MenuItem>
                </Menu>
              </>
            )}
          </PopupState>
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
          <PostActionSection postId={data?.id} />
        </div>
        <Divider variant="middle" />
        {/* Comment section */}
        <div className="mt-3">
          {data?.isLock ? (
            <div className="flex justify-center mb-3">
              <p className="text-dark-gray">Phần bình luận đã bị khóa</p>
            </div>
          ) : (
            <CommentSection
            comments={comments}
            quantity={type === POST_DETAIL ? comments.length : 1}
          />
          )}
        </div>
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
