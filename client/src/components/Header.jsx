import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import cookie from "react-cookies";

import {
  Avatar,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Menu,
  MenuItem,
  TextField,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import GroupIcon from "@mui/icons-material/Group";
import EmailIcon from "@mui/icons-material/Email";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import KeyOutlinedIcon from "@mui/icons-material/KeyOutlined";

import { logo1, logo2 } from "../assets";
import { GROUP, HOME, LETTER } from "../constants/page";
import { useStateContext } from "../contexts/ContextProvider";
import PopupState, { bindMenu, bindTrigger } from "material-ui-popup-state";
import { LOGOUT } from "../constants/common";
import { ROLE_PAGE } from "../routes";
import { ROLE_LECTURER } from "../constants/role";
import { LoadingButton } from "../components";
import { changePassword } from "../apis/UserApi";

const Header = () => {
  const { pageContent, setPageContent, user, userDispatch } = useStateContext();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [openChangePasswordDialog, setOpenChangePasswordDialog] =
    useState(false);
  const [showChangePasswordProgress, setShowChangePasswordProgress] =
    useState(false);

  const [oldPasswordAlert, setOldPasswordAlert] = useState(false);
  const [newPasswordAlert, setNewPasswordAlert] = useState(false);
  const [confirmNewPasswordAlert, setConfirmNewPasswordAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const resetAlert = () => {
    setOldPasswordAlert(false);
    setNewPasswordAlert(false);
    setConfirmNewPasswordAlert(false);
    setAlertMessage('');
  };

  const validate = () => {
    let message = "";

    if (oldPassword === "" || newPassword === "" || confirmNewPassword === "") {
      message = "Vui lòng nhập đầy đủ thông tin!";
    } else if (newPassword !== confirmNewPassword) {
      message = "Mật khẩu không trùng khớp!";
    }

    setNewPasswordAlert(
      newPassword === "" || newPassword !== confirmNewPassword ? true : false
    );
    setConfirmNewPasswordAlert(
      confirmNewPassword === "" || confirmNewPassword !== newPassword
        ? true
        : false
    );

    return message;
  };

  const navigate = useNavigate();

  const handleIconClick = (iconName) => {
    setPageContent(iconName);
  };

  const handleOpenChangePasswordDialog = (popupState) => {
    setOpenChangePasswordDialog(true);
    popupState.close();
  };

  const handleLogout = () => {
    userDispatch({ type: LOGOUT });

    navigate(ROLE_PAGE, { replace: true });
    window.location.reload();
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    resetAlert();

    const process = async () => {
      setShowChangePasswordProgress(true);

      const passwordData = {
        password: oldPassword,
        newPassword: newPassword,
      };
      try {
        let res = await changePassword(passwordData);
        console.log(res);
        if (res.data === "SUCCESSFUL") setOpenChangePasswordDialog(false);
        else if (res.data === "WRONG_PASSWORD") {
          setAlertMessage("Mật khẩu cũ không chính xác!");
          setOldPasswordAlert(true);
        }
      } catch (e) {
        if (e.response.status === 401)
          setAlertMessage("Bạn không có quyền đổi mật khẩu!");
      } finally {
        setShowChangePasswordProgress(false);
      }
    };

    let message = validate();

    if (message === "") process();
    else setAlertMessage(message);
  };

  return (
    <div className="w-full fixed z-10 h-16 flex items-center bg-white drop-shadow-md">
      <Container>
        <div className="flex justify-between items-center">
          <div>
            <img src={logo1} alt="Logo OU" className="max-lg:hidden w-44" />
            <img src={logo2} alt="Logo OU" className="lg:hidden w-16" />
          </div>

          <div className="w-full absolute left-0 right-0 flex justify-center">
            <Link
              to="/dashboard"
              className={`max-md:px-3 px-8 py-1 max-sm:mx-2 mx-4 rounded-lg cursor-pointer ${
                pageContent === HOME ? "text-primary" : "text-dark-gray"
              } hover:bg-gray`}
              onClick={() => handleIconClick(HOME)}
            >
              <HomeIcon fontSize="large" />
            </Link>
            <Link
              to="/groups"
              className={`max-md:px-3 px-8 py-1 max-sm:mx-2 mx-4 rounded-lg cursor-pointer ${
                pageContent === GROUP ? "text-primary" : "text-dark-gray"
              } hover:bg-gray`}
              onClick={() => handleIconClick(GROUP)}
            >
              <GroupIcon fontSize="large" />
            </Link>
            <Link
              to="/letters"
              className={`max-md:px-3 px-8 py-1 max-sm:mx-2 mx-4 rounded-lg cursor-pointer ${
                pageContent === LETTER ? "text-primary" : "text-dark-gray"
              } hover:bg-gray`}
              onClick={() => handleIconClick(LETTER)}
            >
              <EmailIcon fontSize="large" />
            </Link>
          </div>
          {/* Avatar */}

          <PopupState variant="popover" popupId="demo-popup-menu">
            {(popupState) => (
              <>
                <div
                  {...bindTrigger(popupState)}
                  className="w-fit flex justify-end items-center"
                >
                  <div className="md:flex md:items-center md:bg-gray md:px-4 md:py-2 md:rounded-md">
                    <p className="mr-2 font-semibold max-md:hidden">
                      {`${user?.lastName} ${user?.firstName}`}
                    </p>
                    <Avatar
                      sx={{ width: 35, height: 35 }}
                      alt="User Avatar"
                      src={user?.avatar}
                      className="cursor-pointer"
                    />
                  </div>
                </div>
                <Menu
                  anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                  transformOrigin={{ vertical: "top", horizontal: "center" }}
                  elevation={2}
                  {...bindMenu(popupState)}
                >
                  <MenuItem onClick={popupState.close}>
                    <Link
                      to={`/users/${user?.username}`}
                      className="flex items-center"
                    >
                      <AccountCircleOutlinedIcon fontSize="small" />
                      <span className="ml-2">Xem trang cá nhân</span>
                    </Link>
                  </MenuItem>
                  {user?.role === ROLE_LECTURER && (
                    <MenuItem
                      onClick={() => handleOpenChangePasswordDialog(popupState)}
                    >
                      <div className="flex items-center">
                        <KeyOutlinedIcon fontSize="small" />
                        <span className="ml-2">Đổi mật khẩu</span>
                      </div>
                    </MenuItem>
                  )}
                  <MenuItem onClick={popupState.close}>
                    <div
                      onClick={handleLogout}
                      className="w-full flex items-center text-red"
                    >
                      <LogoutOutlinedIcon fontSize="small" />
                      <span className="ml-2">Đăng xuất</span>
                    </div>
                  </MenuItem>
                </Menu>
              </>
            )}
          </PopupState>
        </div>
      </Container>
      {/* Change password dialog */}
      <Dialog
        open={openChangePasswordDialog}
        onClose={() => setOpenChangePasswordDialog(false)}
      >
        <DialogTitle>Đổi mật khẩu</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Vui lòng cung cấp mật khẩu cũ và mật khẩu mới.
          </DialogContentText>
          <TextField
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            autoFocus
            error={oldPasswordAlert}
            margin="dense"
            id="oldPassword"
            label="Mật khẩu cũ"
            type="password"
            fullWidth
            variant="outlined"
          />
          <TextField
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            margin="dense"
            error={newPasswordAlert}
            id="newPassword"
            label="Mật khẩu mới"
            type="password"
            fullWidth
            variant="outlined"
          />
          <TextField
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            autoFocus
            error={confirmNewPasswordAlert}
            margin="dense"
            id="confirmNewPassword"
            label="Nhập lại mật khẩu mới"
            type="password"
            fullWidth
            variant="outlined"
          />
          {alertMessage !== "" && (
            <div className="w-full flex justify-center mt-2 text-red">
              <p>{alertMessage}</p>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            disableElevation
            onClick={() => setOpenChangePasswordDialog(false)}
          >
            Cancel
          </Button>
          {showChangePasswordProgress ? (
            <LoadingButton />
          ) : (
            <Button
              variant="contained"
              disableElevation
              onClick={handleChangePassword}
            >
              Đổi mật khẩu
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Header;
