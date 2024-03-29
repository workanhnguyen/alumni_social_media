import React, { useState } from "react";
import cookie from "react-cookies";
import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
} from "firebase/auth";

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

import { ROLE_ALUMNI } from "../constants/role";
import { Copyright, LoadingButton } from "../components";
import { getCurrentUser, loginUser } from "../apis/UserApi";
import { ALUMNI_ADD_INFO, DASHBOARD, INFO_PAGE, ROOT_PAGE } from "../routes";
import { useStateContext } from "../contexts/ContextProvider";
import { GROUP, LETTER, LOGIN, TOKEN, USER } from "../constants/common";
import { auth } from "../configs/FirebaseConfig";
import {
  FIREBASE_EMAIL_SUFFIX,
  FIREBASE_PASSWORD_SUFFIX,
} from "../constants/firsebase";

const defaultTheme = createTheme();

export default function SignInForm({ role }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { userDispatch } = useStateContext();

  const [showProgress, setShowProgress] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [uAlert, setUAlert] = useState(false);
  const [pAlert, setPAlert] = useState(false);

  const navigate = useNavigate();

  const isContainsEmptyFields = (data) => {
    return (
      data.role === ROLE_ALUMNI &&
      (data.phone === null ||
        data.phone === "" ||
        data.academicYear === null ||
        data.academicYear === "" ||
        data.bgImage === null ||
        data.majorId === null)
    );
  };

  const handleLogin = async (body) => {
    setShowProgress(true);

    try {
      let response = await loginUser(body);

      if (response.status === 200) {
        cookie.save(TOKEN, response.data);

        let userRes = await getCurrentUser();
        
        if (userRes.status === 200) {
          cookie.save(USER, {...userRes.data, groupsSet: [], letterSet: []});

          userDispatch({
            type: LOGIN,
            payload: userRes.data,
          });

          const methods = await fetchSignInMethodsForEmail(
            auth,
            `${userRes.data.username}${FIREBASE_EMAIL_SUFFIX}`
          );
          if (methods.length === 0) {
            createUserWithEmailAndPassword(
              auth,
              `${userRes.data.username}${FIREBASE_EMAIL_SUFFIX}`,
              userRes.data.email
            ).then((res) => console.log(res));
          }
        }

        if (isContainsEmptyFields(userRes.data)) navigate(ALUMNI_ADD_INFO);
        else navigate(ROOT_PAGE, { replace: true });
      }
    } catch (e) {
      switch (e.response.status) {
        case 401:
          setAlertMessage("Tên tài khoản hoặc mật khẩu không chính xác!");
          break;
        case 423:
          setAlertMessage(
            "Tài khoản đang bị khóa, vui lòng liên hệ quản trị viên!"
          );
          break;
        default:
          setAlertMessage("Lỗi bất định, vui lòng thử lại sau!");
      }
    } finally {
      setShowProgress(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setAlertMessage("");

    const message = validate();

    if (message === "") {
      const loginData = { username, password };

      handleLogin(loginData);
    } else {
      setAlertMessage(message);
    }
  };

  const validate = () => {
    let message = "";

    if (username === "" || password === "")
      message = "Vui lòng nhập đầy đủ thông tin!";

    setUAlert(username === "");
    setPAlert(password === "");

    return message;
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Đăng nhập
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <Grid container>
              {/* Username */}
              <Grid item xs={12}>
                <TextField
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  error={uAlert}
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label={
                    role === ROLE_ALUMNI ? "Mã số sinh viên" : "Tên đăng nhập"
                  }
                  name="username"
                  autoComplete="username"
                  autoFocus
                />
              </Grid>

              {/* Password */}
              <Grid item xs={12}>
                <TextField
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={pAlert}
                  margin="normal"
                  required
                  fullWidth
                  id="password"
                  label="Mật khẩu"
                  type="password"
                  name="password"
                  autoComplete="password"
                />
              </Grid>

              {/* Alert */}
              <Grid item xs={12}>
                <div
                  className={`w-full ${
                    alertMessage === ""
                      ? "hidden"
                      : "flex justify-center mt-2 text-red"
                  } `}
                >
                  {alertMessage}
                </div>
              </Grid>

              {/* Login button */}
              <Grid item xs={12}>
                {showProgress ? (
                  <LoadingButton sx={{ mt: 2, mb: 2 }} size="large" fullWidth />
                ) : (
                  <Button
                    type="submit"
                    fullWidth
                    disableElevation
                    variant="contained"
                    sx={{ mt: 2, mb: 2 }}
                  >
                    Đăng nhập
                  </Button>
                )}
              </Grid>

              {/* Switch login -> register */}
              <Grid item xs={12}>
                {role === ROLE_ALUMNI ? (
                  <Link
                    to="/register/alumni"
                    className="w-full flex justify-center underline mt-3 text-primary text-sm"
                  >
                    Chưa có tài khoản? Đăng ký
                  </Link>
                ) : null}
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 3, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
