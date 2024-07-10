import React from 'react';

// pages & components
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Home } from './pages/Home';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className='pages'>
          <Routes>
          <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
