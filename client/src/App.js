import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AlumniLogin, AlumniRegister, ChooseRole, DashBoard, LecturerLogin } from './pages';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ChooseRole />} />

        <Route path='/login/alumni' element={<AlumniLogin />} />
        <Route path='/login/lecturer' element={<LecturerLogin />} />
        <Route path='/register/alumni' element={<AlumniRegister />} />
        <Route path='/dashboard' element={<DashBoard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App