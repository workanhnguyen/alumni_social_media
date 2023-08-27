import React, { useState } from "react";

import { Button, Divider, Menu, MenuItem } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AutoFixHighOutlinedIcon from "@mui/icons-material/AutoFixHighOutlined";
import CommentsDisabledOutlinedIcon from "@mui/icons-material/CommentsDisabledOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

import EditPostForm from "./EditPostForm";
import {
  CommentSection,
  LoadingButton,
  PostActionSection,
  PostCreatorInfo,
  PostReactionQuantity,
} from "../components";
import PostImageSlider from "./PostImageSlider";
import { DELETE, POST_DETAIL } from "../constants/common";
import PopupState, { bindMenu, bindTrigger } from "material-ui-popup-state";
import { useStateContext } from "../contexts/ContextProvider";
import { deletePost } from "../apis/PostApi";

const Post = ({ data, className, type }) => {
  const { user, postDispatch, comments } = useStateContext();

  const [showEditPostForm, setShowEditPostForm] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showDeleteProgress, setShowDeleteProgress] = useState(false);

  const handleShowEditPostForm = () => {
    setShowEditPostForm(true);
  };

  const handleDeletePost = () => {
    const process = async () => {
      setShowDeleteProgress(true);
      try {
        let res = await deletePost(data?.id);
        console.log(res);
        if (res.status === 200) {
          postDispatch({ type: DELETE, payload: data?.id });

          setShowConfirmDialog(false);
        }
      } catch (e) {
        console.log(e);
      } finally {
        setShowDeleteProgress(false);
      }
    };
    process();
  };

  return (
    <>
      <div
        className={`${className} flex flex-col pt-4 pb-1 mt-3 bg-white rounded-md drop-shadow-sm`}
      >
        <div className="w-full flex justify-between px-4">
          {/* Creator info */}
          <PostCreatorInfo post={data} />
          {/* More actions */}
          {user?.id === data?.userId?.id && (
            <PopupState variant="popover" popupId="demo-popup-menu">
              {(popupState) => (
                <>
                  <div
                    {...bindTrigger(popupState)}
                    className="w-fit flex items-center px-2 py-0.5 hover:bg-gray active:bg-gray-2 rounded-full cursor-pointer"
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
                      <div
                        onClick={handleShowEditPostForm}
                        className="flex items-center"
                      >
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
                      <div
                        onClick={() => setShowConfirmDialog(true)}
                        className="flex items-center text-red"
                      >
                        <DeleteOutlineOutlinedIcon fontSize="small" />
                        <span className="ml-2">Xóa bài viết</span>
                      </div>
                    </MenuItem>
                  </Menu>
                </>
              )}
            </PopupState>
          )}
        </div>

        {/* Post content */}
        <div
          className="w-full h-fit max-h-52 mt-3 px-4 overflow-auto"
          dangerouslySetInnerHTML={{ __html: data?.content }}
        />
        {/* Post images slider */}
        {data?.images && (
          <div className="mt-3">
            <PostImageSlider images={data?.images} />
          </div>
        )}
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
          {data?.isLocked ? (
            <div className="flex justify-center mb-3">
              <p className="text-dark-gray">Phần bình luận đã bị khóa</p>
            </div>
          ) : (
            <CommentSection
              postId={data?.id}
              quantity={type === POST_DETAIL ? comments.length : 2}
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

      {/* Confirm delete dialog */}
      <div
        className={`${
          showConfirmDialog ? "" : "hidden"
        } fixed w-screen h-screen top-0 bot-0 right-0 left-0 z-10 bg-blackOverlay`}
      >
        <div className="w-full h-screen flex items-center justify-center">
          <div className="max-sm:w-11/12 w-128 flex flex-col bg-white rounded-md">
            <div className="w-full flex justify-center">
              <p className="font-bold p-4 text-xl">Xóa bài viết?</p>
            </div>
            <Divider />
            <div className="px-4 py-2">
              <p>Bài viết này sẽ bị xóa vĩnh viễn! Vẫn xóa?</p>
            </div>
            <div className="w-full flex justify-end px-4 pb-4 gap-4">
              <Button
                onClick={() => setShowConfirmDialog(!showConfirmDialog)}
                variant="outlined"
              >
                Hủy
              </Button>
              {showDeleteProgress ? (
                <LoadingButton color="error" />
              ) : (
                <Button
                  onClick={handleDeletePost}
                  disableElevation
                  color="error"
                  variant="contained"
                  size="small"
                >
                  Xóa
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
