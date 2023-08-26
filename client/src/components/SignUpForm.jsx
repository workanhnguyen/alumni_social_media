import React, { useRef, useState } from "react";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { CircularProgress } from "@mui/material";

import { Copyright } from "../components";
import { ALUMNI, EMAIL_REGEX } from "../constants/common";
import { ALUMNI_LOGIN } from "../routes";
import { registerUser } from "../apis/UserApi";

const defaultTheme = createTheme();

export default function SignUpForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [avatar, setAvatar] = useState(null);

  const [alertMessage, setAlertMessage] = useState("");
  const [fnAlert, setFnAlert] = useState(false);
  const [lnAlert, setLnAlert] = useState(false);
  const [sIdAlert, setSIdAlert] = useState(false);
  const [eAlert, setEAlert] = useState(false);
  const [pAlert, setPAlert] = useState(false);
  const [cpAlert, setCpAlert] = useState(false);
  const [aAlert, setAAlert] = useState(false);

  const [showProgress, setShowProgress] = useState(false);
  const [isRegisterSuccessfull, setIsRegisterSuccessfull] = useState(false);
  const fileInputRef = useRef();
  const navigate = useNavigate();

  const handleChooseAvatar = (e) => {
    setAvatar(e.target.files[0]);
  };

  const handleRemoveAvatar = () => {
    setAvatar(null);
  };

  const handleResetInputField = () => {
    setFirstName("");
    setLastName("");
    setStudentId("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setAvatar(null);
    setAlertMessage("");
  };

  const handleRegister = async (body) => {
    try {
      setShowProgress(true);

      let { data } = await registerUser(body);

      if (data) {
        handleResetInputField();
        setIsRegisterSuccessfull(true);
        setTimeout(() => navigate(ALUMNI_LOGIN), 2000);
      } else {
        setAlertMessage("Đăng ký thất bại, vui lòng thử lại sau!");
      }
    } catch (err) {
      console.log(err);
      setAlertMessage("Đăng ký thất bại, vui lòng thử lại sau!");
      setShowProgress(false);
    } finally {
      setShowProgress(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setAlertMessage("");

    const message = validate();

    if (message === "") {
      const userForm = new FormData();
      userForm.append("username", studentId);
      userForm.append("studentId", studentId);
      userForm.append("firstName", firstName);
      userForm.append("lastName", lastName);
      userForm.append("email", email);
      userForm.append("role", ALUMNI);
      userForm.append("password", password);
      userForm.append("avatar", avatar, avatar.name);

      handleRegister(userForm);
    } else {
      setAlertMessage(message);
    }
  };

  const validate = () => {
    let message = "";

    if (
      firstName === "" ||
      lastName === "" ||
      studentId === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === "" ||
      avatar === null
    ) {
      message = "Vui lòng nhập đầy đủ thông tin!";
    } else if (password !== confirmPassword) {
      message = "Mật khẩu không trùng khớp!";
    } else if (!EMAIL_REGEX.test(email)) {
      message = "Định dạng email không hợp lệ!";
    }

    setFnAlert(firstName === "");
    setLnAlert(lastName === "");
    setSIdAlert(studentId === "");
    setEAlert(email === "");
    setEAlert(!EMAIL_REGEX.test(email));
    setPAlert(password === "" || password !== confirmPassword ? true : false);
    setCpAlert(
      confirmPassword === "" || confirmPassword !== password ? true : false
    );
    setAAlert(avatar === null);

    return message;
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            height: "100vh",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Đăng ký thông tin cựu sinh viên
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  error={lnAlert}
                  name="lastName"
                  required
                  fullWidth
                  id="lastName"
                  label="Họ và tên đệm"
                  autoFocus
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  error={fnAlert}
                  required
                  fullWidth
                  id="firstName"
                  label="Tên"
                  name="firstName"
                  size="small"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  error={sIdAlert}
                  required
                  fullWidth
                  id="studentId"
                  label="Mã số sinh viên"
                  name="studentId"
                  size="small"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={eAlert}
                  required
                  fullWidth
                  id="email"
                  label="Địa chỉ email"
                  name="email"
                  type="email"
                  size="small"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={pAlert}
                  id="password"
                  type="password"
                  size="small"
                  required
                  label="Mật khẩu"
                  name="password"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  error={cpAlert}
                  id="confirm-password"
                  size="small"
                  type="password"
                  required
                  label="Nhập lại mật khẩu"
                  name="confirmPassword"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <div
                  className={`w-full h-40 border p-2 ${
                    aAlert ? "border-red" : "border-gray-2"
                  } rounded-md overflow-auto`}
                >
                  {avatar === null ? (
                    <label
                      htmlFor="fileInput"
                      className={`relative overflow-auto`}
                    >
                      <div className="w-full h-full flex flex-col justify-center items-center bg-gray-3 rounded-md hover:bg-gray-2 cursor-pointer">
                        <AddPhotoAlternateIcon fontSize="large" />
                        <span className="font-semibold">
                          Thêm ảnh đại diện *
                        </span>
                      </div>
                    </label>
                  ) : (
                    <div className="relative w-full h-full bg-gray-3 overflow-auto rounded-md">
                      <div className="relative mb-3">
                        <div
                          onClick={handleRemoveAvatar}
                          className="absolute top-2.5 right-3 px-1.5 py-1 drop-shadow-md rounded-full bg-white cursor-pointer hover:bg-gray-2"
                        >
                          <CloseIcon fontSize="small" />
                        </div>
                        <img
                          className="h-full"
                          src={URL.createObjectURL(avatar)}
                          alt="avatar-preview"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </Grid>
              <Grid item xs={12}>
                <div
                  className={`w-full ${
                    alertMessage === ""
                      ? "hidden"
                      : "flex justify-center text-red"
                  }`}
                >
                  {alertMessage}
                </div>
              </Grid>
              <Grid item xs={12}>
                {isRegisterSuccessfull ? (
                  <Button
                    color="success"
                    size="large"
                    variant="outlined"
                    fullWidth
                    startIcon={<CheckCircleIcon />}
                    sx={{ mt: 0, mb: 2 }}
                  >
                    Đăng ký thành công
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    fullWidth
                    variant={`${showProgress ? "outlined" : "contained"}`}
                    sx={{ mt: 0, mb: 2 }}
                    size="large"
                  >
                    {showProgress ? <CircularProgress size={28} /> : "Đăng ký"}
                  </Button>
                )}
              </Grid>
              <Grid item xs={12}>
                <Link
                  to="/login/alumni"
                  className="w-full flex justify-center -mt-3 underline text-primary text-sm cursor-pointer"
                >
                  Đã có tài khoản? Đăng nhập
                </Link>
              </Grid>
              <Grid item xs={12}>
                <Copyright sx={{ mt: 0 }} />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      <input
        className="hidden"
        ref={fileInputRef}
        id="fileInput"
        type="file"
        multiple={false}
        accept=".png, .jpg"
        onChange={handleChooseAvatar}
      />
    </ThemeProvider>
  );
}
