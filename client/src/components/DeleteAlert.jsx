import React from "react";

import { Button, Divider } from "@mui/material";

const DeleteAlert = ({ show, setShow, setConfirmDelete }) => {
  return (
    <div
      className={`${
        show ? "" : "hidden"
      } fixed top-0 bot-0 right-0 left-0 z-10 bg-blackOverlay`}
    >
      <div className="w-full h-screen flex items-center justify-center">
        <div className="max-sm:w-11/12 w-128 flex flex-col bg-white rounded-md">
          <div className="w-full flex justify-center">
            <p className="font-bold p-4 text-xl">Xóa bài viết?</p>
          </div>
          <Divider />
          <div className="px-4 py-2">
            <p>Bài viết này sẽ bị xóa vĩnh viễn! Vẫn xóa?</p>
          </div>
          <div className="w-full flex justify-end px-4 pb-4 gap-4">
            <Button onClick={() => setShow(!show)} variant="outlined">
              Hủy
            </Button>
            <Button
              onClick={() => setConfirmDelete(true)}
              disableElevation
              color="error"
              variant="contained"
            >
              Xóa
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteAlert;
