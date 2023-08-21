import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AlumniLoginPage, AlumniRegisterPage, ChooseRolePage, DashBoard, GroupPage, LecturerLoginPage, LetterPage, PersonalPage } from './pages';
import PostDetailPage from './pages/PostDetailPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ChooseRolePage />} />

        <Route path='/login/alumni' element={<AlumniLoginPage />} />
        <Route path='/login/lecturer' element={<LecturerLoginPage />} />
        <Route path='/register/alumni' element={<AlumniRegisterPage />} />
        <Route path='/dashboard' element={<DashBoard />} />
        <Route path='/groups' element={<GroupPage />} />
        <Route path='/letters' element={<LetterPage />} />
        <Route path='/:username' element={<PersonalPage />} />
        <Route path='/posts/:id' element={<PostDetailPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App