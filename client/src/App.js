import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AdminLogin, AlumniLogin, ChooseRole, LecturerLogin } from './pages';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ChooseRole />} />

        <Route path='/login/admin' element={<AdminLogin />} />
        <Route path='/login/alumni' element={<AlumniLogin />} />
        <Route path='/login/lecturer' element={<LecturerLogin />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App