import React from 'react';
import { Route, Routes } from 'react-router-dom';

import './App.css';
import Home from './pages/Home';
import Users from './pages/users/users';
import UserDetail from './pages/users/userDetail';
import Materials from './pages/materials/materials';

import Sidebar from './components/Sidebar';
import CreateUser from './pages/users/createUser';

function App() {
  return (
    <div className='App'>
      <Sidebar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/*' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/users' element={<Users />} />
        <Route path='/users/create' element={<CreateUser />} />
        <Route path='/users/:id' element={<UserDetail />} />
        <Route path='/materials' element={<Materials />} />
      </Routes>
    </div>
  );
}

export default App;
