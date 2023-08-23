import React from "react";

import { Avatar } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

const CommentItem = ({ data }) => {
  return (
    <div className="w-fit flex mb-3">
      <Avatar
        src={data?.user?.avatar}
        alt="avatar"
        sx={{ width: 32, height: 32 }}
      />

      <div className="flex ml-2">
        <div className="flex flex-col">
          <div className="w-fit flex text-sm break-all">
            <div className="p-2 bg-gray rounded-md">
              <p className="font-semibold">{`${data?.user?.lastName} ${data?.user?.firstName}`}</p>
              <p>{data?.content}</p>
            </div>
            <div className="flex items-start w-fit h-fit ml-1 p-2 rounded-full cursor-pointer hover:bg-gray">
              <MoreHorizIcon fontSize="inherit" />
            </div>
          </div>

          <div className="flex items-center gap-3 mt-1 mx-2">
            <span className="text-xs font-semibold cursor-pointer hover:underline">
              Phản hồi
            </span>
            <span className="text-xs">{data?.createdAt}</span>
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
                    <div className="w-fit flex text-sm break-all">
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
  );
};

export default CommentItem;
