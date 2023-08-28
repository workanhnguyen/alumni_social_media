import React, { useRef, useState } from "react";

import CloseIcon from "@mui/icons-material/Close";
import PublicIcon from "@mui/icons-material/Public";
import { Avatar, Box, Button, Divider } from "@mui/material";

import { CustomTextField, ImageEditor, LoadingButton } from "../components";
import { updatePost } from "../apis/PostApi";
import { useStateContext } from "../contexts/ContextProvider";
import { UPDATE } from "../constants/common";

const EditPostForm = ({ data, show, setShow }) => {
  const [content, setContent] = useState(data?.content || "");
  const [images, setImages] = useState(data?.images || []);

  const { postDispatch } = useStateContext();

  const [showProgress, setShowProgress] = useState(false);
  const postPanelRef = useRef();

  const handleClosePostPanel = () => {
    setShow(false);
  };

  const handleImageChange = (newImages) => {
    setImages(newImages);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const process = async () => {
      try {
        setShowProgress(true);

        const updatePostData = {
          content: content,
          isLocked: data?.isLocked,
        };

        console.log(updatePostData);

        let res = await updatePost(data.id, updatePostData);

        if (res.status === 200) {
          postDispatch({ type: UPDATE, payload: res.data });

          handleClosePostPanel();
        }
        console.log(res);
      } catch (e) {
        console.log(e);
      } finally {
        setShowProgress(false);
      }
    };

    process();
  };
  return (
    <Box
      onSubmit={handleSubmit}
      component="form"
      ref={postPanelRef}
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
          <Avatar
            src={data?.user?.avatar}
            alt="avt"
            sx={{ width: 40, height: 40 }}
          />
          <div className="flex-1 ml-2">
            <p className="font-semibold">{`${data?.user?.lastName} ${data?.user?.firstName}`}</p>
            <div className="w-fit flex items-center py-1 px-2 bg-gray-2 rounded-md">
              <PublicIcon sx={{ width: 12, height: 12 }} />
              <span className="ml-2 text-xs font-semibold">Công khai</span>
            </div>
          </div>
        </div>
        <CustomTextField content={content} setContent={setContent} />
        <ImageEditor imageList={images} onImageChange={handleImageChange} />
        <div className="mt-3">
          {showProgress ? (
            <LoadingButton fullWidth size="large" />
          ) : (
            <Button
              type="submit"
              disabled={content === "<p><br></p>"}
              fullWidth
              disableElevation
              variant="contained"
            >
              Cập nhật
            </Button>
          )}
        </div>
      </div>
    </Box>
  );
};

export default EditPostForm;
