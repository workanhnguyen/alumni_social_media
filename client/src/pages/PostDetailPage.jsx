import React from "react";
import { Link } from "react-router-dom";

import PublicIcon from "@mui/icons-material/Public";
import { Avatar } from "@mui/material";

import { useStateContext } from "../contexts/ContextProvider";
import { DefaultLayout } from "../layouts";
import { blankAvatar } from "../assets";

const PostDetailPage = () => {
  const { postDetail } = useStateContext();
  return (
    <DefaultLayout>
      <div className="w-full h-full flex justify-center bg-gray">
        <div className="max-sm:w-full w-150 bg-white my-6 mt-20 px-4 py-3 rounded-md drop-shadow-sm">
          {/* Post creator info */}
          <div className="w-fit flex items-center">
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
        </div>
      </div>
    </DefaultLayout>
  );
};

export default PostDetailPage;
