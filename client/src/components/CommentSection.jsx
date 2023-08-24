import React, { useEffect, useState } from "react";

import SendIcon from "@mui/icons-material/Send";
import { Avatar } from "@mui/material";

import { blankAvatar } from "../assets";
import { CommentItem } from "../components";

const CommentSection = ({ comments, quantity = 1 }) => {
  const [commentArr, setcommentArr] = useState([]);
  const [commentContent, setCommentContent] = useState("");

  useEffect(() => {
    if (comments.length < quantity) setcommentArr([...comments]);
    else setcommentArr(comments.slice(0, quantity));
  }, [comments, quantity]);

  const handleCommentContentChange = (e) => {
    setCommentContent(e.target.value);
  };

  return (
    <div className="w-full flex flex-col px-4">
      <div className="flex items-center">
        <Avatar src={blankAvatar} alt="avatar" sx={{ width: 32, height: 32 }} />
        <div className="relative flex-1 flex items-center ml-1 rounded-3xl cursor-pointer hover:bg-gray-2 overflow-hidden">
          <input
            onChange={handleCommentContentChange}
            className="w-full px-3 py-2 border-none outline-none bg-gray"
            placeholder="Viết bình luận..."
          />
          <span
            className={`absolute right-3 ${
              commentContent === "" ? "hidden" : "flex flex-col justify-center"
            } text-primary`}
          >
            <SendIcon fontSize="small" />
          </span>
        </div>
      </div>
      <div className="mt-6">
        {commentArr?.map((comment, index) => (
          <CommentItem key={index} data={comment} />
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
