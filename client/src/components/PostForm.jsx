import React, { useRef, useState } from "react";

import CloseIcon from "@mui/icons-material/Close";
import PublicIcon from "@mui/icons-material/Public";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { Avatar, Button, Divider } from "@mui/material";

import { blankAvatar } from "../assets";
const PostForm = ({ show, setShow }) => {
  const postPanelRef = useRef();

  const [text, setText] = useState("");
  const [image, setImage] = useState(blankAvatar);

  const handleTextChange = (e) => {
    setText(e.target.innerHTML);
  };
  
  const handlePaste = (e) => {
    e.preventDefault();

    const pastedText = e.clipboardData.getData("text/plain"); // Get plain text
    document.execCommand("insertText", false, pastedText); // Insert plain text
  };

  const handleClosePostPanel = () => {
    setShow(false);
  };

  const handleRemoveImage = () => {
    setImage(null);
  };
  return (
    <div
      ref={postPanelRef}
      className={`${
        show ? "" : "hidden"
      } w-full h-screen fixed flex justify-center items-center top-0 left-0 bg-blackOverlay`}
    >
      <div className="relative max-sm:w-full w-128 p-4 bg-white rounded-md">
        <div
          onClick={handleClosePostPanel}
          className="absolute top-2.5 right-3 p-2 rounded-full bg-gray cursor-pointer hover:bg-gray-2"
        >
          <CloseIcon />
        </div>
        <div className="w-full flex justify-center items-center mb-4">
          <p className="font-bold text-lg">Tạo bài viết</p>
        </div>
        <Divider />
        <div className="w-full flex items-center mt-3">
          <Avatar
            src={blankAvatar}
            alt="avatar"
            sx={{ width: 40, height: 40 }}
          />
          <div className="flex-1 ml-2">
            <p className="font-semibold">Anh Nguyễn</p>
            <div className="w-fit flex items-center py-1 px-2 bg-gray-2 rounded-md">
              <PublicIcon sx={{ width: 12, height: 12 }} />
              <span className="ml-2 text-xs font-semibold">Công khai</span>
            </div>
          </div>
        </div>
        <div
          className={`editable-div w-full mt-4 border-none outline-none text-sm ${
            text ? "filled" : ""
          }`}
          data-placeholder="Bạn đang nghĩ gì?"
          contentEditable
          onInput={handleTextChange}
          onPaste={handlePaste}
        />

        <div className="w-full h-60 border mt-3 p-2 border-gray-2 rounded-md">
          <div
            className={`relative w-full h-full flex flex-col justify-center items-center bg-gray-3 rounded-md hover:bg-gray-2 cursor-pointer overflow-auto`}
          >
            {image && (
              <div
                onClick={handleRemoveImage}
                className="absolute top-2.5 right-3 px-1.5 py-1 rounded-full bg-white cursor-pointer hover:bg-gray-2"
              >
                <CloseIcon fontSize="small" />
              </div>
            )}

            {!image ? (
              <>
                <AddPhotoAlternateIcon fontSize="large" />
                <span className="font-semibold">Thêm ảnh</span>
                <span className="text-xs text-dark-gray">hoặc kéo và thả</span>
              </>
            ) : (
              <img className="w-full bg-contain" src={image} alt="" />
            )}
          </div>
        </div>
        <div className="mt-3">
          <Button fullWidth disableElevation variant="contained">
            Đăng
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PostForm;
