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

const App = () => {
  const { token, user } = useStateContext();
  const booleanUser = JSON.parse(
    user === false || user === "false" ? user : null
  );

  const isActivated = user !== null && booleanUser !== false;
  const isFullUserInfo = isActivated && user?.phone !== null && user?.phone !== '' && user?.academicYear !== null && user?.academicYear !== '' && user?.bgImage !== null && user?.majorId !== null;
  return (
    <BrowserRouter>
      <Routes>
        {/* Not authen || not active */}
        {(!token || booleanUser === false) && (
          <Route path={ROLE_PAGE} element={<ChooseRolePage />} />
        )}

        {/* Public routes */}
        <Route path={INFO_PAGE} element={<InfoPage type={NO_ACTIVE} />} />

        {/* Authenticated and activated routes */}
        {isActivated && (
          <>
          {isFullUserInfo ? (
            <>
              <Route path={ROOT_PAGE} element={<DashBoard />} />
              <Route path={GROUPS} element={<GroupPage />} />
              <Route path={LETTERS} element={<LetterPage />} />
              <Route path={CURRENT_USER} element={<PersonalPage />} />
              <Route path={POST_DETAIL} element={<PostDetailPage />} />
            </>
          ) : (
            <Route path={ALUMNI_ADD_INFO} element={<AlumniAddInfoPage />} />
          )}
            
          </>
        )}

        {/* Unauthenticated and unactived routes */}
        {(!user || booleanUser === false) && (
          <>
            <Route
              path={ALUMNI_LOGIN}
              element={
                isActivated ? (
                  <InfoPage type={ALREADY_LOGIN} />
                ) : (
                  <AlumniLoginPage />
                )
              }
            />
            <Route
              path={LECTURER_LOGIN}
              element={
                isActivated ? (
                  <InfoPage type={ALREADY_LOGIN} />
                ) : (
                  <LecturerLoginPage />
                )
              }
            />
            <Route
              path={ALUMNI_REGISTER}
              element={
                isActivated ? (
                  <InfoPage type={ALREADY_LOGIN} />
                ) : (
                  <AlumniRegisterPage />
                )
              }
            />
          </>
        )}

        {/* Redirect unknown paths */}
        <Route
          path="*"
          element={
            <Navigate
              to={!token ? ROLE_PAGE : booleanUser === false ? ROLE_PAGE : isFullUserInfo ? ROOT_PAGE : ALUMNI_ADD_INFO}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
