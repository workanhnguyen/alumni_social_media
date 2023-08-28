import React, { useEffect, useState } from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Menu,
  MenuItem,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AutoFixHighOutlinedIcon from "@mui/icons-material/AutoFixHighOutlined";
import CommentsDisabledOutlinedIcon from "@mui/icons-material/CommentsDisabledOutlined";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
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
import {
  DELETE,
  LOCK_COMMENT,
  POST_DETAIL,
  POST_NORMAL,
  UNLOCK_COMMENT,
} from "../constants/common";
import PopupState, { bindMenu, bindTrigger } from "material-ui-popup-state";
import { useStateContext } from "../contexts/ContextProvider";
import { deletePost, lockPost, unlockPost } from "../apis/PostApi";
import { useNavigate } from "react-router-dom";
import { ROOT_PAGE } from "../routes";

const Post = ({ data, className, type }) => {
  const { user, postDispatch, comments } = useStateContext();
  const navigate = useNavigate();

  const [showEditPostForm, setShowEditPostForm] = useState(false);
  const [openDeletePostDialog, setOpenDeletePostDialog] = useState(false);
  const [showDeleteProgress, setShowDeleteProgress] = useState(false);

  const handleShowEditPostForm = () => {
    setShowEditPostForm(true);
  };

  const handleLockComment = async (popupState) => {
    try {
      let res = await lockPost(data.id);

      if (res.status === 200)
        postDispatch({ type: LOCK_COMMENT, payload: res.data });
    } catch (e) {
      console.log(e);
    } finally {
      popupState.close();
    }
  };

  const handleUnlockComment = async (popupState) => {
    try {
      let res = await unlockPost(data.id);

      if (res.status === 200)
        postDispatch({ type: UNLOCK_COMMENT, payload: res.data });
    } catch (e) {
      console.log(e);
    } finally {
      popupState.close();
    }
  };

  const handleOpenDeletePostDialog = (popupState) => {
    setOpenDeletePostDialog(true);
    popupState.close();
  };

  const handleDeletePost = () => {
    const process = async () => {
      setShowDeleteProgress(true);
      try {
        let res = await deletePost(data?.id);
        console.log(res);
        if (res.status === 200) {
          postDispatch({ type: DELETE, payload: data?.id });

          navigate(ROOT_PAGE, { replace: true });
        }
      } catch (e) {
        console.log(e);
      } finally {
        setShowDeleteProgress(false);
        setOpenDeletePostDialog(false);
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
          {user?.id === data?.user?.id && (
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
                    {data?.isLocked ? (
                      <MenuItem onClick={() => handleUnlockComment(popupState)}>
                        <div className="flex items-center">
                          <CommentOutlinedIcon fontSize="small" />
                          <span className="ml-2">Mở khóa bình luận</span>
                        </div>
                      </MenuItem>
                    ) : (
                      <MenuItem onClick={() => handleLockComment(popupState)}>
                        <div className="flex items-center">
                          <CommentsDisabledOutlinedIcon fontSize="small" />
                          <span className="ml-2">Khóa bình luận</span>
                        </div>
                      </MenuItem>
                    )}
                    <MenuItem
                      onClick={() => handleOpenDeletePostDialog(popupState)}
                    >
                      <div className="flex items-center text-red">
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
              quantity={type !== POST_DETAIL ? comments.length : 2}
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

      {/* Confirm delete post dialog */}
      <Dialog
        open={openDeletePostDialog}
        onClose={() => setOpenDeletePostDialog(false)}
        aria-labelledby="delete-post-dialog-title"
        aria-describedby="delete-post-dialog-description"
      >
        <DialogTitle id="delete-post-dialog-title">Xóa bài viết?</DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-post-dialog-description">
            Bài viết này sẽ bị xóa vĩnh viễn! Vẫn xóa?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            onClick={() => setOpenDeletePostDialog(false)}
            autoFocus
          >
            Hủy
          </Button>
          {showDeleteProgress ? (
            <LoadingButton color="error" />
          ) : (
            <Button
              variant="contained"
              color="error"
              disableElevation
              onClick={handleDeletePost}
            >
              Xóa
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Post;
