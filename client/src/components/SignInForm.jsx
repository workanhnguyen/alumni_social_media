import React, { useState } from "react";
import cookie from "react-cookies";

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
import { CircularProgress } from "@mui/material";

import { ROLE_ALUMNI } from "../constants/role";
import { Copyright } from "../components";
import { getCurrentUser, loginUser } from "../apis/UserApi";
import { DASHBOARD, INFO_PAGE, ROOT_PAGE } from "../routes";
import { useStateContext } from "../contexts/ContextProvider";
import { LOGIN, TOKEN, USER } from "../constants/common";

const defaultTheme = createTheme();

export default function SignInForm({ role }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { dispatch } = useStateContext();

  const [showProgress, setShowProgress] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [uAlert, setUAlert] = useState(false);
  const [pAlert, setPAlert] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (body) => {
    setShowProgress(true);

    try {
      let response = await loginUser(body);

      if (response.status === 200) {
        cookie.save(TOKEN, response.data);

        let { data } = await getCurrentUser();
        cookie.save(USER, data);

        dispatch({
          type: LOGIN,
          payload: data,
        });

        // navigate(ROOT_PAGE, { replace: true });

        if (response.data && data === false)
          navigate(INFO_PAGE);
        else if (response.data && data) navigate(DASHBOARD);
      }
    } catch (e) {
      setShowProgress(false);

      if (e.response.status === 400)
        setAlertMessage("Tên tài khoản hoặc mật khẩu không chính xác!");
      else setAlertMessage("Đăng nhập thất bại, vui lòng thử lại sau!");
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
                <Button
                  type="submit"
                  fullWidth
                  variant={`${showProgress ? "outlined" : "contained"}`}
                  sx={{ mt: 2, mb: 2 }}
                  size="large"
                >
                  {showProgress ? <CircularProgress size={28} /> : "Đăng nhập"}
                </Button>
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
