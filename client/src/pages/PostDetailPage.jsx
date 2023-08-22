import React, { useState } from "react";

import PublicIcon from "@mui/icons-material/Public";
import { Avatar, Divider } from "@mui/material";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import SendIcon from "@mui/icons-material/Send";

import { useStateContext } from "../contexts/ContextProvider";
import { DefaultLayout } from "../layouts";
import { actionHaha, blankAvatar } from "../assets";
import { commentData } from "../data/commentData";
import { Comment } from "../components";

const images = [
  blankAvatar,
  blankAvatar,
  blankAvatar,
  blankAvatar,
  blankAvatar,
];

const comments = commentData;

const PostDetailPage = () => {
  const [comment, setComment] = useState("");
  const { postDetail } = useStateContext();

  const handleCommentContentChange = (e) => {
    setComment(e.target.value);
  };

  // useEffect(() => {

  // }, [comment]);
  return (
    <DefaultLayout>
      <div className="w-full h-full flex justify-center bg-gray">
        <div className="max-sm:w-full w-150 bg-white my-6 mt-20 py-3 rounded-md drop-shadow-sm">
          {/* Post creator info */}
          <div className="w-fit flex items-center px-4">
            <Avatar
              src={blankAvatar}
              alt="avatar"
              sx={{ width: 40, height: 40 }}
              className="cursor-pointer"
            />
            <div className="flex-1 flex flex-col justify-center ml-2 gap-y-1">
              <div className="font-semibold hover:underline cursor-pointer">{`${postDetail?.user?.first_name} ${postDetail?.user?.last_name}`}</div>
              <div className="flex items-center text-dark-gray">
                <span className="text-xs">{postDetail?.timestamp}</span>
                <PublicIcon fontSize="inherit" className="ml-1.5 mb-0.5" />
              </div>
            </div>
          </div>

          {/* Post content */}
          <div
            className="mt-3 px-4"
            dangerouslySetInnerHTML={{ __html: postDetail?.content }}
          />

          {/* Post images */}
          <div className="mt-3 flex overflow-auto gap-x-1">
            {}
            {images.map((image, index) => (
              <img key={index} src={image} alt="img" />
            ))}
          </div>

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
          <div className="w-full flex justify-center items-center gap-x-1 my-2">
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
          <Divider variant="middle" />

          {/* Comment section */}
          <div className="w-full flex flex-col px-4 mt-3">
            <div className="flex flex items-center">
              <Avatar
                src={blankAvatar}
                alt="avatar"
                sx={{ width: 32, height: 32 }}
              />
              <div className="relative flex-1 flex items-center ml-1 rounded-3xl cursor-pointer hover:bg-gray-2 overflow-hidden">
                <input
                  onChange={handleCommentContentChange}
                  className="w-full px-3 py-2 border-none outline-none text-dark-gray bg-gray"
                  placeholder="Viết bình luận..."
                />
                <span
                  className={`absolute right-3 ${
                    comment === "" ? "hidden" : "block"
                  } text-primary`}
                >
                  <SendIcon fontSize="small" />
                </span>
              </div>
            </div>
            <div className="mt-6">
              {comments.map((comment, index) => (
                <Comment key={index} data={comment} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default PostDetailPage;
