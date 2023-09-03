import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import cookie from "react-cookies";

import {
  AlumniAddInfo,
  AlumniAddInfoPage,
  AlumniLoginPage,
  AlumniRegisterPage,
  ChooseRolePage,
  DashBoard,
  GroupPage,
  InfoPage,
  LecturerLoginPage,
  LetterPage,
  PersonalPage,
} from "./pages";
import PostDetailPage from "./pages/PostDetailPage";
import {
  ALUMNI_ADD_INFO,
  ALUMNI_LOGIN,
  ALUMNI_REGISTER,
  CURRENT_USER,
  DASHBOARD,
  GROUPS,
  LECTURER_LOGIN,
  LETTERS,
  POST_DETAIL,
  ROOT_PAGE,
  INFO_PAGE,
  ROLE_PAGE,
} from "./routes";
import { useStateContext } from "./contexts/ContextProvider";
import { ALREADY_LOGIN, NO_ACTIVE } from "./constants/common";
import { ROLE_ALUMNI } from "./constants/role";

const App = () => {
  const { token, user } = useStateContext();
  const booleanUser = JSON.parse(
    user === false || user === "false" ? user : null
  );

  const isContainsEmptyFields = (data) => {
    return (
      data &&
      data.role === ROLE_ALUMNI &&
      (data.phone === null ||
        data.phone === "" ||
        data.academicYear === null ||
        data.academicYear === "" ||
        data.bgImage === null ||
        data.majorId === null)
    );
  };

  const isActivated = user !== null && booleanUser !== false;
  const isFullUserInfo =
    isActivated &&
    user?.phone !== null &&
    user?.phone !== "" &&
    user?.academicYear !== null &&
    user?.academicYear !== "" &&
    user?.bgImage !== null &&
    user?.majorId !== null;
  return (
    <BrowserRouter>
      <Routes>
        {/* Not authentication route */}
        {!token ? (
          <>
            <Route path={ROLE_PAGE} element={<ChooseRolePage />} />
            <Route path={ALUMNI_LOGIN} element={<AlumniLoginPage />} />
            <Route path={LECTURER_LOGIN} element={<LecturerLoginPage />} />
            <Route path={ALUMNI_REGISTER} element={<AlumniRegisterPage />} />
          </>
        ) : (
          <>
            <Route path={ROOT_PAGE} element={<DashBoard />} />
            <Route path={GROUPS} element={<GroupPage />} />
            <Route path={LETTERS} element={<LetterPage />} />
            <Route path={CURRENT_USER} element={<PersonalPage />} />
            <Route path={POST_DETAIL} element={<PostDetailPage />} />
          </>
        )}

        {/* If user with alumni role is not full info */}
        {isContainsEmptyFields(user) && (
          <Route path={ALUMNI_ADD_INFO} element={<AlumniAddInfoPage />} />
        )}

        {/* Redirect if path is a unknown path */}
        <Route
          path="*"
          element={
            <Navigate
              to={
                !token
                  ? ROLE_PAGE
                  : isContainsEmptyFields(user)
                  ? ALUMNI_ADD_INFO
                  : ROOT_PAGE
              }
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
