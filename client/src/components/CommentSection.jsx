import React, { useEffect, useState } from "react";

import SendIcon from "@mui/icons-material/Send";
import { Avatar, Divider } from "@mui/material";
import { CircularProgress } from "@mui/material";

import { blankAvatar } from "../assets";
import { CommentItem } from "../components";
import { addNewComment, getCommentsByPostId } from "../apis/CommentApi";
import { POST_DETAIL } from "../constants/common";
import { Link } from "react-router-dom";

const CommentSection = ({ postId, type, onCommentQuantityChange }) => {
  const [commentList, setCommentList] = useState([]);
  const [updatedComment, setUpdatedComment] = useState(null);
  const [commentContent, setCommentContent] = useState("");
  const [isSendingComment, setIsSendingComment] = useState(false);

  useEffect(() => {
    const handleLoadComment = async () => {
      try {
        let res = await getCommentsByPostId(postId);

        if (res.status === 200) {
          setCommentList(res.data);
        }
      } catch (e) {
        console.log(e);
      }
    };

    handleLoadComment();
  }, [updatedComment]);

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
          setCommentList((prev) => [res.data, ...prev]);
          onCommentQuantityChange(prev => prev + 1);
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
    setCommentList(commentList.filter(comment => comment.id !== deletedCommentId));
  };

  const onCommentUpdate = (updatedComment) => {
    setUpdatedComment(updatedComment);
    setCommentList(prev => prev.filter(comment => comment.id === updatedComment.id ? updatedComment : comment));
  };

  return (
    <div className="w-full flex flex-col px-4">
      <div className="flex items-center">
        <Avatar src={blankAvatar} alt="avatar" sx={{ width: 32, height: 32 }} />
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
          {commentList.map((comment, index) => (
            <CommentItem key={index} data={comment} onCommentDelete={onCommentDelete} onCommentUpdate={onCommentUpdate} onCommentQuantityChange={onCommentQuantityChange} />
          ))}
        </div>
      ) : (
        <>
          <div className="mt-6">
            {commentList.slice(0, 2).map((comment, index) => (
              <CommentItem key={index} data={comment} onCommentDelete={onCommentDelete} onCommentUpdate={onCommentUpdate} onCommentQuantityChange={onCommentQuantityChange} />
            ))}
          </div>
          {commentList.length > 2 && (
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
