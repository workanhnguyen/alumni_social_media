import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import {
  AlumniAddInfoPage,
  AlumniLoginPage,
  AlumniRegisterPage,
  ChatRoomPage,
  ChooseRolePage,
  DashBoard,
  GroupPage,
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
  GROUPS,
  LECTURER_LOGIN,
  LETTERS,
  POST_DETAIL,
  ROOT_PAGE,
  ROLE_PAGE,
  CHAT_ROOM_PAGE,
} from "./routes";
import { useStateContext } from "./contexts/ContextProvider";
import { ROLE_ALUMNI } from "./constants/role";

const App = () => {
  const { token, user } = useStateContext();

  const isAlumniWithEmptyFields = () => {
    return (
      user?.role === ROLE_ALUMNI &&
      (user?.phone === null ||
        user?.phone === "" ||
        user?.academicYear === null ||
        user?.academicYear === "" ||
        user?.bgImage === null ||
        user?.majorId === null)
    );
  };

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
            <Route path={CHAT_ROOM_PAGE} element={<ChatRoomPage />} />
          </>
        )}

        {/* If user with alumni role is not full info */}
        {isAlumniWithEmptyFields() && (
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
                  : isAlumniWithEmptyFields()
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
