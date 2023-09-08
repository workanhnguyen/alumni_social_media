import React, { useEffect, useState } from "react";

import SendIcon from "@mui/icons-material/Send";
import { Avatar, Divider, Pagination } from "@mui/material";
import { CircularProgress } from "@mui/material";

import { blankAvatar } from "../assets";
import { CommentItem, DataLoading } from "../components";
import { addNewComment, getCommentsByPostId } from "../apis/CommentApi";
import { POST_DETAIL, COMMENT_PER_PAGE, CREATE, ADD_COMMENT } from "../constants/common";
import { Link } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import { getCommentQuantityByPostId } from "../apis/PostApi";

const CommentSection = ({
  listComments,
  isPostOwner,
  postId,
  type,
  onCommentQuantityChange,
}) => {
  const {
    comments,
    commentDispatch,
    postDispatch,
    commentCount,
    setCommentCount,
    commentIndex,
    setCommentIndex,
  } = useStateContext();

  const [commentList, setCommentList] = useState([]);
  const [updatedComment, setUpdatedComment] = useState(null);
  const [deletedCommentId, setDeletedCommentId] = useState(null);
  const [commentContent, setCommentContent] = useState("");
  const [isSendingComment, setIsSendingComment] = useState(false);
  const [isCommentLoading, setIsCommentLoading] = useState(false);

  // useEffect(() => {
  //   const handleLoadComment = async () => {
  //     setIsCommentLoading(true);
  //     try {
  //       const commentPageData = new FormData();
  //       commentPageData.append("page", commentIndex);

  //       let commentRes = await getCommentsByPostId(postId, commentPageData);
  //       let countRes = await getCommentQuantityByPostId(postId);

  //       if (commentRes.status === 200) {
  //         setCommentList(commentRes.data);
  //       }
  //       if (countRes.status === 200) {
  //         setCommentCount(countRes.data);
  //       }
  //     } catch (e) {
  //       console.log(e);
  //     } finally {
  //       setIsCommentLoading(false);
  //     }
  //   };

  //   handleLoadComment();
  // }, [updatedComment, deletedCommentId, postId, commentIndex, comments]);

  const handleCommentContentChange = (e) => {
    setCommentContent(e.target.value);
  };

  const handleSendComment = () => {
    const process = async () => {
      setIsSendingComment(true);

      let commentData = {
        content: commentContent.trim(),
      };

      try {
        let res = await addNewComment(postId, commentData);

        if (res.status === 201) {
          // setCommentList((prev) => [res.data, ...prev]);
          // commentDispatch({ type: CREATE, payload: res.data });
          postDispatch({ type: ADD_COMMENT, payload: { postId: postId, newComment: res.data }});
          // onCommentQuantityChange((prev) => prev + 1);
        }
      } catch (e) {
        console.log(e);
      } finally {
        setIsSendingComment(false);
        setCommentContent("");
      }
    };

    process();
  };

  const onCommentDelete = (deletedCommentId) => {
    setDeletedCommentId(deletedCommentId);
    setCommentList((prev) =>
      prev.filter((comment) => comment.id !== deletedCommentId)
    );
  };

  const onCommentUpdate = (updatedComment) => {
    setUpdatedComment(updatedComment);
    setCommentList((prev) =>
      prev.filter((comment) =>
        comment.id === updatedComment.id ? updatedComment : comment
      )
    );
  };

  if (isCommentLoading)
    return (
      <div className="w-full my-2 flex justify-center">
        <DataLoading />
      </div>
    );
  else
    return (
      <div className="w-full flex flex-col px-4">
        <div className="flex items-center">
          <Avatar
            src={blankAvatar}
            alt="avatar"
            sx={{ width: 32, height: 32 }}
          />
          <div className="relative flex-1 flex items-center ml-1 rounded-3xl cursor-pointer hover:bg-gray-2 overflow-hidden">
            <input
              value={commentContent}
              onChange={handleCommentContentChange}
              className="w-full px-3 pr-10 py-2 border-none outline-none bg-gray"
              placeholder="Viết bình luận..."
            />
            <span
              onClick={handleSendComment}
              className={`absolute right-3 ${
                commentContent === ""
                  ? "hidden"
                  : "flex flex-col justify-center"
              } text-primary`}
            >
              {isSendingComment ? (
                <CircularProgress size={"24px"} />
              ) : (
                <SendIcon fontSize="small" />
              )}
            </span>
          </div>
        </div>
        {type === POST_DETAIL ? (
          <div className="mt-6">
          
            {listComments.length > 0 && listComments.map((comment, index) => (
              <div key={index}>
                <CommentItem
                  isPostOwner={isPostOwner}
                  postId={postId}
                  comment={comment}
                  onCommentDelete={onCommentDelete}
                  onCommentUpdate={onCommentUpdate}
                  onCommentQuantityChange={onCommentQuantityChange}
                />
                {comment.listComments && comment.listComments.length > 0 && (
                  <div>
                    {comment.listComments.map((responseComment, resIndex) => (
                      <div className="ml-10" key={resIndex}>
                        <CommentItem
                          isPostOwner={isPostOwner}
                          showRes={false}
                          
                          comment={responseComment}
                          postId={postId}
                          onCommentDelete={onCommentDelete}
                          onCommentUpdate={onCommentUpdate}
                          onCommentQuantityChange={onCommentQuantityChange}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {listComments.length > 0 && (
              <div className="w-full flex justify-center mb-3">
                <Pagination
                  color="primary"
                  count={Math.ceil(commentCount / COMMENT_PER_PAGE)}
                  onChange={(event, page) => setCommentIndex(page)}
                  page={commentIndex}
                />
              </div>
            )}
          </div>
        ) : (
          <>
            <div className="mt-6">
              {listComments.slice(0, 2).map((comment, index) => (
                <div key={index}>
                  <CommentItem
                    isPostOwner={isPostOwner}
                    comment={comment}
                    postId={postId}
                    onCommentDelete={onCommentDelete}
                    onCommentUpdate={onCommentUpdate}
                    onCommentQuantityChange={onCommentQuantityChange}
                  />
                  {comment.listComments && comment.listComments.length > 0 && (
                    <div>
                      {comment.listComments.map((responseComment, resIndex) => (
                        <div className="ml-10" key={resIndex}>
                          <CommentItem
                            isPostOwner={isPostOwner}
                            showRes={false}
                            comment={responseComment}
                            postId={postId}
                            onCommentDelete={onCommentDelete}
                            onCommentUpdate={onCommentUpdate}
                            onCommentQuantityChange={onCommentQuantityChange}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            {listComments.length > 2 && (
              <>
                <Divider variant="middle" />
                <Link
                  to={`/posts/${postId}`}
                  className="w-full flex justify-center my-2 text-primary hover:underline cursor-pointer"
                >
                  Xem thêm bình luận
                </Link>
              </>
            )}
          </>
        )}
      </div>
    );
};

export default CommentSection;
