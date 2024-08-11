import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard'; 
import Signin from './components/Signin';
import Home from './components/Home';  
import { RecoilRoot } from 'recoil';

function App() {
  return (
    <BrowserRouter>
    <RecoilRoot>
    <div className='text-center'>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path='/signin' element={<Signin/>}/>
          <Route path='/home' element={<Home/>}/>
          {/* Add other routes here as needed */}
        </Routes>
      </div>
    </RecoilRoot>
    </BrowserRouter>
  );
}

export default App;
