import React from 'react';
import { Route, Routes } from 'react-router-dom';

import './App.css';
import Home from './pages/Home';
import Users from './pages/users/users';
import UserDetail from './pages/users/userDetail';
import Materials from './pages/materials/materials';

import Sidebar from './components/Sidebar';
import CreateUser from './pages/users/createUser';
import DeleteUser from './pages/users/deleteUser';
import UpdateUser from './pages/users/updateUser';
import MaterialDetail from './pages/materials/materialDetail';
import CreateMaterial from './pages/materials/createMaterial';
import DeleteMaterial from './pages/materials/deleteMaterial';
import UpdateMaterial from './pages/materials/updateMaterial';

function App() {
  return (
    <div className='container mx-auto'>
      <Sidebar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/*' element={<Home />} />
        <Route path='/home' element={<Home />} />

        {/* User routes */}
        <Route path='/users' element={<Users />} />
        <Route path='/users/create' element={<CreateUser />} />
        <Route path='/users/:id' element={<UserDetail />} />
        <Route path='/users/:id/delete' element={<DeleteUser />} />
        <Route path='/users/:id/update' element={<UpdateUser />} />

        {/* Material routes */}
        <Route path='/materials' element={<Materials />} />
        <Route path='/materials/create' element={<CreateMaterial />} />
        <Route path='/materials/:id' element={<MaterialDetail />} />
        <Route path='/materials/:id/delete' element={<DeleteMaterial />} />
        <Route path='/materials/:id/update' element={<UpdateMaterial />} />
      </Routes>
    </div>
  );
}

export default App;
