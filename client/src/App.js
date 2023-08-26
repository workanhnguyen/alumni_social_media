import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
} from "./routes";
import { useStateContext } from "./contexts/ContextProvider";
import { ALREADY_LOGIN, NO_ACTIVE } from "./constants/common";

const App = () => {
  const { token, user } = useStateContext();
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route
          path={ROOT_PAGE}
          element={token && user ? <DashBoard /> : <ChooseRolePage />}
        />
        <Route path={INFO_PAGE} element={<InfoPage type={NO_ACTIVE} />} />
        <Route
          path={ALUMNI_LOGIN}
          element={
            user ? <InfoPage type={ALREADY_LOGIN} /> : <AlumniLoginPage />
          }
        />
        <Route
          path={LECTURER_LOGIN}
          element={
            user ? <InfoPage type={ALREADY_LOGIN} /> : <LecturerLoginPage />
          }
        />
        <Route
          path={ALUMNI_REGISTER}
          element={
            user ? <InfoPage type={ALREADY_LOGIN} /> : <AlumniRegisterPage />
          }
        />

        {/* Unauthenticated routes */}
        {/* {token === null && (
          <>
            <Route path={ALUMNI_LOGIN} element={<AlumniLoginPage />} />
            <Route path={LECTURER_LOGIN} element={<LecturerLoginPage />} />
            <Route path={ALUMNI_REGISTER} element={<AlumniRegisterPage />} />
          </>
        )} */}

        {/* Authenticated and activated routes */}
        {token && user ? (
          <>
            <Route path={DASHBOARD} element={<DashBoard />} />
            <Route path={GROUPS} element={<GroupPage />} />
            <Route path={LETTERS} element={<LetterPage />} />
            <Route path={CURRENT_USER} element={<PersonalPage />} />
            <Route path={POST_DETAIL} element={<PostDetailPage />} />
            <Route path={ALUMNI_ADD_INFO} element={<AlumniAddInfoPage />} />
          </>
        ) : null}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
