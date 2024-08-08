import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard'; 
import Signin from './components/Signin';
import Home from './components/Home';  

function App() {
  return (
    <BrowserRouter>
      <div className='text-center'>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path='/signin' element={<Signin/>}/>
          <Route path='/home' element={<Home/>}/>
          {/* Add other routes here as needed */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
