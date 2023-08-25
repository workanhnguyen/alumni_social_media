import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AlumniLoginPage, AlumniRegisterPage, ChooseRolePage, DashBoard, GroupPage, LecturerLoginPage, LetterPage, PersonalPage } from './pages';
import PostDetailPage from './pages/PostDetailPage';
import { ALUMNI_LOGIN, ALUMNI_REGISTER, CURRENT_USER, DASHBOARD, GROUPS, LECTURER_LOGIN, LETTERS, POST_DETAIL, ROOT_PAGE } from './routes';
import { useStateContext } from './contexts/ContextProvider';

const App = () => {
  const { token } = useStateContext();
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROOT_PAGE} element={token ? <DashBoard /> : <ChooseRolePage />} />

        <Route path={ALUMNI_LOGIN} element={<AlumniLoginPage />} />
        <Route path={LECTURER_LOGIN} element={<LecturerLoginPage />} />
        <Route path={ALUMNI_REGISTER} element={<AlumniRegisterPage />} />
        <Route path={DASHBOARD} element={<DashBoard />} />
        <Route path={GROUPS} element={<GroupPage />} />
        <Route path={LETTERS} element={<LetterPage />} />
        <Route path={CURRENT_USER} element={<PersonalPage />} />
        <Route path={POST_DETAIL} element={<PostDetailPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App