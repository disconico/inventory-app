import React from 'react';
import { Route, Routes } from 'react-router-dom';

import './App.css';
import Home from './pages/Home';
import Add from './pages/Add';
import Users from './pages/Users';
import Materials from './pages/Materials';

import Sidebar from './components/Sidebar';

function App() {
  return (
    <div className='App'>
      <Sidebar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/*' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/users' element={<Users />} />
        <Route path='/materials' element={<Materials />} />
        <Route path='/add' element={<Add />} />
      </Routes>
    </div>
  );
}

export default App;
