import React from "react";

import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { DASHBOARD, ROOT_PAGE } from "../../routes";
import { ALREADY_LOGIN, UNAUTHORIZED } from "../../constants/common";

const PageException = ({ type }) => {
  const navigate = useNavigate();

  const handleShowMessage = (type) => {
    switch (type) {
      case ALREADY_LOGIN:
        return "Bạn đã đăng nhập rồi!";
      case UNAUTHORIZED:
        return "Bạn không có quyền truy cập trang này!";
      default:
        return;
    }
  };

  const handleNavigate = (type) => {
    switch (type) {
      case ALREADY_LOGIN:
        navigate(DASHBOARD, { replace: true });
        break;
      case UNAUTHORIZED:
        navigate(ROOT_PAGE, { replace: true });
        break;
      default:
        return;
    }
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center gap-3">
      <p>{handleShowMessage(type)}</p>
      <Button
        onClick={() => handleNavigate(type)}
        variant="contained"
        disableElevation
      >
        Quay lại
      </Button>
    </div>
  );
};

export default PageException;