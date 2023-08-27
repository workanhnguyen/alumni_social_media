import React, { useEffect, useState } from "react";
import moment from "moment";
import "moment/locale/vi";

import { Avatar, Button, Divider, Menu, MenuItem } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import PopupState, { bindMenu, bindTrigger } from "material-ui-popup-state";
import AutoFixHighOutlinedIcon from "@mui/icons-material/AutoFixHighOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import SendIcon from "@mui/icons-material/Send";
import { CircularProgress } from "@mui/material";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import { useStateContext } from "../contexts/ContextProvider";
import {
  addNewComment,
  deleteComment,
  updateComment,
} from "../apis/CommentApi";
import { CREATE, DELETE, UPDATE } from "../constants/common";
import LoadingButton from "./LoadingButton";

moment.locale("vi");

const CommentItem = ({ data }) => {
  const { user, commentDispatch, comments } = useStateContext();
  const [commentContent, setCommentContent] = useState(data.content);
  const [responseCommentContent, setResponseCommentContent] = useState("");

  const [isSendingComment, setIsSendingComment] = useState(false);
  const [isSendResponseComment, setIsSendResponseComment] = useState(false);
  const [showEditInput, setShowEditInput] = useState(false);
  const [showResponseComment, setShowResponseComment] = useState(false);
  const [showConfirmDeleteCommentDialog, setShowConfirmDeleteCommentDialog] =
    useState(false);
  const [showDeleteCommentProgress, setShowDeleteCommentProgress] =
    useState(false);

  const handleCommentContentChange = (e) => {
    setCommentContent(e.target.value);
  };

  const handleResponseCommentContentChange = (e) => {
    setResponseCommentContent(e.target.value);
  };

  const handleShowEditCommentField = () => {
    setCommentContent(data.content);
    setShowEditInput(true);
  };

  const handleHideEditCommentField = () => {
    setCommentContent(data.content);
    setShowEditInput(false);
  };

  const handleShowResponseComment = () => {
    setShowResponseComment(true);
  };

  const handleHideResponseComment = () => {
    setShowResponseComment(false);
  };

  const handleUpdateComment = () => {
    const process = async () => {
      setIsSendingComment(true);

      let editedComment = {
        content: commentContent,
      };

      try {
        let res = await updateComment(data.id, editedComment);
        console.log(res);

        if (res.status === 201) {
          handleHideEditCommentField();

          commentDispatch({ type: UPDATE, payload: res.data });
        }
      } catch (e) {
        console.log(e);
      } finally {
        setIsSendingComment(false);
      }
    };

    process();
  };

  console.log(showConfirmDeleteCommentDialog);

  const handleDeleteComment = () => {
    const process = async () => {
      setShowDeleteCommentProgress(true);
      try {
        let res = await deleteComment(data.id);

        if (res.status === 200) {
          commentDispatch({ type: DELETE, payload: data.id });
        }
      } catch (e) {
        console.log(e);
      } finally {
        setShowConfirmDeleteCommentDialog(false);
        setShowDeleteCommentProgress(false);
      }
    };

    process();
  };

  const handleSendResponseComment = () => {
    const process = async () => {
      setIsSendResponseComment(true);

      const responseCommentData = {
        content: responseCommentContent,
      };
      try {
        let res = await addNewComment(1, responseCommentData);

        if (res.status === 201) {
          commentDispatch({ type: CREATE, payload: res.data });

          setResponseCommentContent("");
          handleHideResponseComment();
        }
      } catch (e) {
        console.log(e);
      } finally {
        setIsSendResponseComment(false);
      }
    };

    process();
  };

  return (
    <>
      <div className="w-full flex flex-col mb-3">
        <div className="flex">
          <Avatar
            src={data?.user?.avatar}
            alt="avatar"
            sx={{ width: 32, height: 32 }}
          />

          <div className="w-full flex ml-2">
            <div className={`${showEditInput ? "flex-1" : ""} flex flex-col`}>
              <div className="flex text-sm break-all">
                <div className="flex-1 p-2 bg-gray rounded-md">
                  <p className="font-semibold">{`${data?.userId?.lastName} ${data?.userId?.firstName}`}</p>
                  {showEditInput ? (
                    <div className="relative flex-1 flex items-center cursor-pointer overflow-hidden">
                      <input
                        value={commentContent}
                        onChange={handleCommentContentChange}
                        className="w-full pr-3 py-2 border-none outline-none bg-gray"
                        placeholder={data?.content}
                      />
                      <div className="flex items-center">
                        <span
                          className={`${
                            commentContent === ""
                              ? "hidden"
                              : "flex flex-col justify-center"
                          } text-primary`}
                        >
                          {isSendingComment ? (
                            <CircularProgress size="12px" />
                          ) : (
                            <div className="flex items-center">
                              <span onClick={handleUpdateComment}>
                                <SendIcon fontSize="small" />
                              </span>
                            </div>
                          )}
                        </span>
                        <span
                          onClick={handleHideEditCommentField}
                          className="ml-1 px-1.5 py-0.5 rounded-full hover:bg-gray-2"
                        >
                          <ClearOutlinedIcon fontSize="inherit" />
                        </span>
                      </div>
                    </div>
                  ) : (
                    <p>{data?.content}</p>
                  )}
                </div>

                {/* Comment actions */}
                {showEditInput ? null : (
                  <PopupState variant="popover" popupId="demo-popup-menu">
                    {(popupState) => (
                      <>
                        <div
                          {...bindTrigger(popupState)}
                          className="w-fit h-fit flex items-center p-2 ml-1 hover:bg-gray active:bg-gray-2 rounded-full cursor-pointer"
                        >
                          <MoreHorizIcon fontSize="inherit" />
                        </div>
                        <Menu
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "left",
                          }}
                          transformOrigin={{
                            vertical: "top",
                            horizontal: "center",
                          }}
                          elevation={2}
                          {...bindMenu(popupState)}
                        >
                          <MenuItem onClick={popupState.close}>
                            <div
                              className="flex items-center"
                              onClick={handleShowEditCommentField}
                            >
                              <AutoFixHighOutlinedIcon fontSize="small" />
                              <span className="ml-2">Chỉnh sửa bình luận</span>
                            </div>
                          </MenuItem>
                          <MenuItem>
                            <div
                              onClick={() =>
                                setShowConfirmDeleteCommentDialog(
                                  !showConfirmDeleteCommentDialog
                                )
                              }
                              className="flex items-center text-red"
                            >
                              <DeleteOutlineOutlinedIcon fontSize="small" />
                              <span>Xóa bình luận</span>
                            </div>
                          </MenuItem>
                          <div
                            className={`${
                              showConfirmDeleteCommentDialog
                                ? "flex justify-between"
                                : "hidden"
                            }`}
                          >
                            <MenuItem onClick={popupState.close}>
                              <Button
                                onClick={() =>
                                  setShowConfirmDeleteCommentDialog(false)
                                }
                                variant="outlined"
                              >
                                Hủy
                              </Button>
                            </MenuItem>
                            <MenuItem>
                              {showDeleteCommentProgress ? (
                                <LoadingButton color="error" />
                              ) : (
                                <Button
                                  onClick={handleDeleteComment}
                                  variant="contained"
                                  disableElevation
                                  color="error"
                                >
                                  Xóa
                                </Button>
                              )}
                            </MenuItem>
                          </div>
                        </Menu>
                      </>
                    )}
                  </PopupState>
                )}
              </div>

              <div className="flex items-center gap-3 mt-1 mx-2">
                <span
                  onClick={handleShowResponseComment}
                  className="text-xs font-semibold cursor-pointer hover:underline"
                >
                  Phản hồi
                </span>
                <span className="text-xs">
                  {moment(data?.createdAt).fromNow()}
                </span>
              </div>

              {data?.comments?.length !== 0 &&
                data?.comments?.map((comment, index) => (
                  <div className="w-fit flex mt-3" key={index}>
                    <Avatar
                      src={data?.user?.avatar}
                      alt="avatar"
                      sx={{ width: 32, height: 32 }}
                    />

                    <div className="flex ml-2">
                      <div className="flex flex-col">
                        <div className="w-full flex text-sm break-all">
                          <div className="p-2 bg-gray rounded-md">
                            <p className="font-semibold">{`${comment.user.lastName} ${comment.user.firstName}`}</p>
                            <p>{comment.content}</p>
                          </div>
                          <div className="flex items-start w-fit h-fit ml-1 p-2 rounded-full cursor-pointer hover:bg-gray">
                            <MoreHorizIcon fontSize="inherit" />
                          </div>
                        </div>

                        <div className="flex items-center gap-3 mt-1 mx-2">
                          <span className="text-xs">{comment.createdAt}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
        {/* Response comment */}
        {showResponseComment && (
          <div className="w-full flex items-center mt-2 cursor-pointer overflow-hidden">
            <div className="absolute left-14">
              <Avatar
                src={data?.user?.avatar}
                alt="avatar"
                sx={{ width: 24, height: 24 }}
              />
            </div>
            <div className="flex-1 rounded-full ml-18 overflow-hidden">
              <input
                value={responseCommentContent}
                onChange={handleResponseCommentContentChange}
                className="w-full px-3 py-2 pr-16 text-sm border-none outline-none bg-gray"
                placeholder={`Phản hồi ${data?.userId?.lastName} ${data?.userId?.firstName}`}
              />
            </div>
            <div className="absolute right-5 flex items-center">
              <span
                className={`${
                  responseCommentContent === ""
                    ? "hidden"
                    : "flex flex-col justify-center"
                } text-primary`}
              >
                {isSendResponseComment ? (
                  <CircularProgress size="12px" />
                ) : (
                  <div className="flex items-center">
                    <span onClick={handleSendResponseComment}>
                      <SendIcon fontSize="small" />
                    </span>
                  </div>
                )}
              </span>
              <span
                onClick={handleHideResponseComment}
                className="ml-1 px-1.5 py-0.5 rounded-full hover:bg-gray-2"
              >
                <ClearOutlinedIcon fontSize="inherit" />
              </span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CommentItem;
