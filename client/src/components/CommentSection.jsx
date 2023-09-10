import React, { useEffect, useState } from "react";

import SendIcon from "@mui/icons-material/Send";
import { Avatar, Divider, Pagination } from "@mui/material";
import { CircularProgress } from "@mui/material";

import { blankAvatar } from "../assets";
import { CommentItem } from "../components";
import { addNewComment, getCommentsByPostId } from "../apis/CommentApi";
import {
  POST_DETAIL,
  COMMENT_PER_PAGE,
  ADD_COMMENT,
} from "../constants/common";
import { Link } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import { getCommentQuantityByPostId } from "../apis/PostApi";

const CommentSection = ({ listComments, isPostOwner, postId, type }) => {
  const {
    user,
    posts,
    postDispatch,
    commentCount,
    setCommentCount,
    commentIndex,
    setCommentIndex,
  } = useStateContext();

  const [commentContent, setCommentContent] = useState("");
  const [commentsForDetailPage, setCommentsForDetailPage] = useState(listComments);
  const [isSendingComment, setIsSendingComment] = useState(false);

  const handleCommentContentChange = (e) => {
    setCommentContent(e.target.value);
  };

  useEffect(() => {
    if (type === POST_DETAIL) {
      const process = async () => {
        try {
          let res = await getCommentsByPostId(postId, commentIndex);

          if (res.status === 200) {
            setCommentsForDetailPage(res.data);
          }
        } catch (e) {
        }
      };

      process();
    }
  }, [posts, commentIndex]);

  useEffect(() => {
    if (type === POST_DETAIL) {
      const process = async () => {
        let res = await getCommentQuantityByPostId(postId);

        if (res.status === 200) setCommentCount(res.data);
      };
      process();
    }
  }, []);

  const handleSendComment = () => {
    const process = async () => {
      setIsSendingComment(true);

      let commentData = {
        content: commentContent.trim(),
      };

      try {
        let res = await addNewComment(postId, commentData);

        if (res.status === 201) {
          setCommentCount(prev => prev + 1);
          postDispatch({
            type: ADD_COMMENT,
            payload: { postId: postId, newComment: res.data },
          });
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

  const handleEnterSendComment = (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        handleSendComment();
      }
  };

  return (
    <div className="w-full flex flex-col px-4">
      <div className="flex items-center">
        <Avatar src={user?.avatar} alt="avatar" sx={{ width: 32, height: 32 }} />
        <div className="relative flex-1 flex items-center ml-1 rounded-3xl cursor-pointer hover:bg-gray-2 overflow-hidden">
          <input
            value={commentContent}
            onChange={handleCommentContentChange}
            onKeyPress={handleEnterSendComment}
            className="w-full px-3 pr-10 py-2 border-none outline-none bg-gray"
            placeholder="Viết bình luận..."
          />
          <span
            onClick={handleSendComment}
            className={`absolute right-3 ${
              commentContent === "" ? "hidden" : "flex flex-col justify-center"
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
          {commentsForDetailPage.length > 0 &&
            commentsForDetailPage.map((comment, index) => (
              <div key={index}>
                <CommentItem
                  isPostOwner={isPostOwner}
                  postId={postId}
                  comment={comment}
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
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          {commentsForDetailPage.length > 0 && (
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
