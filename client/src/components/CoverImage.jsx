import React, { useEffect, useState } from "react";

import CameraAltIcon from "@mui/icons-material/CameraAlt";
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import LoadingButton from "./LoadingButton";
import ImageUploader from "./ImageUploader";
import { updateCoverImageUser } from "../apis/UserApi";
import { useStateContext } from "../contexts/ContextProvider";
import { UPDATE } from "../constants/common";
import { useParams } from "react-router-dom";

const CoverImage = ({ bgImage }) => {

  const { user, userDispatch } = useStateContext();
  const { username } = useParams();

  const [coverImage, setCoverImage] = useState([]);

  const [contentWidth, setContentWidth] = useState(window.innerWidth);
  const [openChangeCoverImageDialog, setOpenChangeCoverImageDialog] =
    useState(false);
  const [showUpdateProgress, setShowUpdateProgress] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setContentWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isCurrentUser = () => {
    return username === user.username;
  }

  const handleChangeCoverImage = async () => {
    setShowUpdateProgress(true);

    const coverImageData = new FormData();
    coverImageData.append("coverImage", coverImage[0]);

    try {
      let res = await updateCoverImageUser(coverImageData);

      if (res.status === 200) {
        userDispatch({ type: UPDATE, payload: { bgImage: res.data.bgImage }});
      }
    } catch (e) {}
    finally {
      setShowUpdateProgress(false);
      setOpenChangeCoverImageDialog(false);
    }
  };

  const handleChooseCoverImage = (newCoverImage) => {
    setCoverImage(newCoverImage);
  };

  console.log(coverImage);
  return (
    <>
      <div
        className="relative w-full max-h-80 bg-gray-2 overflow-hidden rounded-bl-md rounded-br-md"
        style={{ height: `${contentWidth / 3}px` }}
      >
        <img className="w-full" src={bgImage} alt="" />
        {isCurrentUser() && (
          <div
          onClick={() => setOpenChangeCoverImageDialog(true)}
          className="absolute bottom-4 right-3 w-fit flex justify-center items-center p-2 bg-blackOverlay text-white rounded-md cursor-pointer"
        >
          <CameraAltIcon />
          <span className="ml-1 font-semibold max-md:hidden">
            {bgImage === null ? "Thêm ảnh bìa" : "Chỉnh sửa ảnh bìa"}
          </span>
        </div>
        )}
      </div>

      {/* Change cover image dialog */}
      <Container maxWidth="sm">
        <Dialog
          fullWidth
          open={openChangeCoverImageDialog}
          onClose={() => setOpenChangeCoverImageDialog(false)}
        >
          <DialogTitle>Cập nhật ảnh bìa</DialogTitle>
          <DialogContent>
            <ImageUploader onImagesChange={handleChooseCoverImage} />
          </DialogContent>
          <DialogActions>
            <Button
              variant="outlined"
              disableElevation
              onClick={() => setOpenChangeCoverImageDialog(false)}
            >
              Hủy
            </Button>
            {showUpdateProgress ? (
              <LoadingButton />
            ) : (
              <Button
                variant="contained"
                disableElevation
                disabled={!coverImage[0]}
                onClick={handleChangeCoverImage}
              >
                Cập nhật
              </Button>
            )}
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
};

export default CoverImage;
