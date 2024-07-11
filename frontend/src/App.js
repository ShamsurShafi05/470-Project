import React from 'react';

// pages & components
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Home } from './pages/Home';
import Navbar from './components/Navbar';
import EachEvent from './pages/EachEvent';
import Event from './pages/Event';
import UserCalendar from './pages/UserCalendar';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className='pages'>
          <Routes>
          <Route path="/" element={<Home />} />
          
          
          {/* Routes for user */}
          <Route path="/events" element={<Event />} />
          <Route path="/calendar" element={<UserCalendar />} />
          <Route path="/events/:_id" element={<EachEvent />} />
          
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
