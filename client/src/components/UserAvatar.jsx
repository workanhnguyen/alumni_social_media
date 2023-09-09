import React, { useState } from "react";
import { useParams } from "react-router-dom";

import {
  Avatar,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

import { useStateContext } from "../contexts/ContextProvider";
import { LoadingButton, ImageUploader } from "../components";
import { updateAvatarUser } from "../apis/UserApi";
import { UPDATE } from "../constants/common";

const UserAvatar = ({ avatar }) => {
  const { user, userDispatch } = useStateContext();
  const { username } = useParams();

  const [toUpdateAvatar, setToUpdateAvatar] = useState([]);

  const [openChangeAvatarDialog, setOpenChangeAvatarDialog] = useState(false);
  const [showUpdateProgress, setShowUpdateProgress] = useState(false);

  const isCurrentUser = () => {
    return username === user.username;
  };

  const handleChangeAvatar = async () => {
    setShowUpdateProgress(true);

    const avatarData = new FormData();
    avatarData.append("avatar", toUpdateAvatar[0]);
    try {
      let res = await updateAvatarUser(avatarData);

      if (res.status === 200) {
        userDispatch({ type: UPDATE, payload: { avatar: res.data.avatar } });
      }
    } catch (e) {
    } finally {
      setShowUpdateProgress(false);
      setOpenChangeAvatarDialog(false);
    }
  };

  const handleAvatarChange = (newAvatar) => {
    setToUpdateAvatar(newAvatar);
  }

  return (
    <>
      <div className="relative w-44 h-44 flex justify-center items-center rounded-full bg-white -mt-8 max-lg:-mt-20 cursor-pointer">
        <Avatar
          src={avatar}
          alt="avatar"
          sx={{ width: 168, height: 168 }}
          className="rounded-full"
        />
        {/* Edit avatar icon */}
        {isCurrentUser() && (
          <div onClick={() => setOpenChangeAvatarDialog(true)} className="absolute bottom-2 right-3 w-9 h-9 flex justify-center items-center rounded-full bg-gray-4">
            <CameraAltIcon className="mt-1" />
          </div>
        )}
      </div>
      {/* Change avatar dialog */}
      <Container maxWidth="sm">
        <Dialog
          fullWidth
          open={openChangeAvatarDialog}
          onClose={() => setOpenChangeAvatarDialog(false)}
        >
          <DialogTitle>Cập nhật ảnh đại diện</DialogTitle>
          <DialogContent>
            <ImageUploader onImagesChange={handleAvatarChange} />
          </DialogContent>
          <DialogActions>
            <Button
              variant="outlined"
              disableElevation
              onClick={() => setOpenChangeAvatarDialog(false)}
            >
              Hủy
            </Button>
            {showUpdateProgress ? (
              <LoadingButton />
            ) : (
              <Button
                variant="contained"
                disableElevation
                disabled={!avatar[0]}
                onClick={handleChangeAvatar}
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

export default UserAvatar;
