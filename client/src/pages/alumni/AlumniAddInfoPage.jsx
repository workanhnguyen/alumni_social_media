import React, { useRef, useState } from "react";

import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { CircularProgress } from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

import { useStateContext } from "../../contexts/ContextProvider";
import { departmentData, majorData } from "../../data";
import { PHONE_REGEX } from "../../constants/common";

const defaultTheme = createTheme();
const departments = departmentData;
const majors = majorData;

const AlumniAddInfoPage = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [department, setDepartment] = useState("");
  const [majorId, setMajorId] = useState("");
  const [year, setYear] = useState("");

  const [pnAlert, setPnAlert] = useState(false);
  const [cIAlert, setCIAlert] = useState(false);
  const [mAlert, setMAlert] = useState(false);
  const [yAlert, setYAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [showProgress, setShowProgress] = useState(false);
  const [isUpdateSuccessful, setIsUpdateSuccessful] = useState(false);

  const fileInputRef = useRef();

  const handleChooseCoverImage = (e) => {
    setCoverImage(e.target.files[0]);
  };

  const handleRemoveCoverImage = () => {
    setCoverImage(null);
  };

  const handleDepartmentChange = (e) => {
    setDepartment(e.target.value);
  };

  const handleMajorChange = (e) => {
    setMajorId(e.target.value);
  };

  const handleUpdateUserInfo = () => {
    setAlertMessage("");
    let message = validate();

    if (message === "") {
    } else setAlertMessage(message);
  };

  const validate = () => {
    let message = "";

    if (
      phoneNumber === "" ||
      majorId === "" ||
      coverImage === null ||
      year === ""
    )
      message = "Vui lòng nhập đầy đủ thông tin!";
    else if (!PHONE_REGEX.test(phoneNumber))
      message = "Số điện thoại không hợp lệ!";

    setPnAlert(phoneNumber === "");
    setPnAlert(!PHONE_REGEX.test(phoneNumber));

    setMAlert(majorId === "");
    setYAlert(year === "");
    setCIAlert(coverImage === null);

    return message;
  };

  console.log(coverImage);

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
            <AutoAwesomeIcon />
          </Avatar>
          <Typography marginBottom={1} component="h1" variant="h5">
            Thêm thông tin cựu sinh viên
          </Typography>
          <Grid container>
            {/* Phone number */}
            <Grid item xs={12}>
              <TextField
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                error={pnAlert}
                margin="dense"
                required
                fullWidth
                id="phone-number"
                label="Số điện thoại"
                name="phone-number"
                autoFocus
              />
            </Grid>

            {/* Choose department */}
            <Grid item xs={12}>
              <FormControl fullWidth margin="dense" required error={mAlert}>
                <InputLabel id="department">Chọn khoa</InputLabel>
                <Select
                  labelId="department"
                  id="department"
                  value={department}
                  label="Chọn khoa"
                  onChange={handleDepartmentChange}
                >
                  {departments.map((department, index) => (
                    <MenuItem key={index} value={department.id}>
                      {department.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Choose majority */}
            <Grid item xs={12}>
              <FormControl fullWidth margin="dense" required>
                <InputLabel id="majority">Chọn ngành</InputLabel>
                <Select
                  disabled={department === ""}
                  labelId="majority"
                  id="majority"
                  value={majorId}
                  label="Chọn ngành"
                  onChange={handleMajorChange}
                >
                  {majors
                    .filter((m) => m.departmentId === department)
                    .map((major, index) => (
                      <MenuItem key={index} value={major.id}>
                        {major.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Student year */}
            <Grid item xs={12}>
              <TextField
                value={year}
                onChange={(e) => setYear(e.target.value)}
                error={yAlert}
                margin="dense"
                required
                fullWidth
                id="year"
                label="Khóa"
                name="year"
              />
            </Grid>

            {/* Cover Image */}
            <Grid item xs={12}>
              <div
                className={`w-full h-40 border p-2 my-3 ${
                  cIAlert ? "border-red" : "border-gray-2"
                } rounded-md overflow-auto`}
              >
                {coverImage === null ? (
                  <label
                    htmlFor="fileInput"
                    className={`relative overflow-auto`}
                  >
                    <div className="w-full h-full flex flex-col justify-center items-center bg-gray-3 rounded-md hover:bg-gray-2 cursor-pointer">
                      <AddPhotoAlternateIcon fontSize="large" />
                      <span className="font-semibold">Thêm ảnh bìa *</span>
                    </div>
                  </label>
                ) : (
                  <div className="relative w-full h-full bg-gray-3 overflow-auto rounded-md">
                    <div className="relative mb-3">
                      <div
                        onClick={handleRemoveCoverImage}
                        className="absolute top-2.5 right-3 px-1.5 py-1 drop-shadow-md rounded-full bg-white cursor-pointer hover:bg-gray-2"
                      >
                        <CloseIcon fontSize="small" />
                      </div>
                      <img
                        className="h-full"
                        src={URL.createObjectURL(coverImage)}
                        alt="avatar-preview"
                      />
                    </div>
                  </div>
                )}
              </div>
            </Grid>

            {/* Alert message */}
            <Grid item xs={12}>
              <p
                className={`w-full ${
                  alertMessage === "" ? "hidden" : "flex justify-center"
                } mb-3 text-red`}
              >
                {alertMessage}
              </p>
            </Grid>

            {/* Update button */}
            <Grid item xs={12}>
              {isUpdateSuccessful ? (
                <Button
                  color="success"
                  size="large"
                  variant="outlined"
                  fullWidth
                  startIcon={<CheckCircleIcon />}
                  sx={{ mt: 0, mb: 2 }}
                >
                  Cập nhật thành công
                </Button>
              ) : (
                <Button
                  onClick={handleUpdateUserInfo}
                  fullWidth
                  disableElevation
                  variant={`${showProgress ? "outlined" : "contained"}`}
                  sx={{ mt: 0, mb: 2 }}
                  size="large"
                >
                  {showProgress ? <CircularProgress size={28} /> : "Cập nhật"}
                </Button>
              )}
            </Grid>
          </Grid>
        </Box>
      </Container>
      <input
        className="hidden"
        ref={fileInputRef}
        id="fileInput"
        type="file"
        multiple={false}
        accept=".png, .jpg"
        onChange={handleChooseCoverImage}
      />
    </ThemeProvider>
  );
};

export default AlumniAddInfoPage;
