import React, { useRef, useState } from "react";

import CloseIcon from "@mui/icons-material/Close";
import PublicIcon from "@mui/icons-material/Public";
import { Avatar, Box, Button, Divider } from "@mui/material";

import { CustomTextField, ImageUploader, LoadingButton } from "../components";
import { useStateContext } from "../contexts/ContextProvider";
import { addNewPost } from "../apis/PostApi";
import { CREATE } from "../constants/common";

const PostForm = ({ show, setShow }) => {
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);

  const [showProgress, setShowProgress] = useState(false);
  const { user, postDispatch } = useStateContext();

  const handleClosePostPanel = () => {
    setShow(false);
  };

  const handleImageChange = (newImages) => {
    setImages(newImages);
  };

  const handleClearInput = () => {
    setContent("");
    setImages([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const process = async () => {
      setShowProgress(true);
      const postData = {
        content,
      };

      try {
        let res = await addNewPost(postData);

        if (res.status === 201) {
          postDispatch({ type: CREATE, payload: res.data });

          handleClearInput();
        }
      } catch (e) {
        setShowProgress(false);
      } finally {
        setShowProgress(false);
        handleClosePostPanel();
      }
    };

    process();
  };
console.log(content)
  return (
    <Box
      onSubmit={handleSubmit}
      component="form"
      className={`${
        show ? "" : "hidden"
      } w-full h-screen fixed z-20 flex justify-center items-center top-0 left-0 bg-blackOverlay`}
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
          <Avatar src={user?.avatar} alt="avt" sx={{ width: 40, height: 40 }} />
          <div className="flex-1 ml-2">
            <p className="font-semibold">{`${user?.lastName} ${user?.firstName}`}</p>
            <div className="w-fit flex items-center py-1 px-2 bg-gray-2 rounded-md">
              <PublicIcon sx={{ width: 12, height: 12 }} />
              <span className="ml-2 text-xs font-semibold">Công khai</span>
            </div>
          </div>
        </div>
        <CustomTextField content={content} setContent={setContent} />
        <ImageUploader onImagesChange={handleImageChange} />
        <div className="mt-3">
          {showProgress ? (
            <LoadingButton fullWidth />
          ) : (
            <Button
              type="submit"
              fullWidth
              disableElevation
              variant="contained"
              disabled={content === "<p><br></p>" && images.length === 0}
            >
              Đăng
            </Button>
          )}
        </div>
      </div>
    </Box>
  );
};

export default PostForm;
