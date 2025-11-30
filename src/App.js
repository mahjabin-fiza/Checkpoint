import React from 'react';
import HotelSearch from './components/HotelSearch';
import './App.css';
import Header from './components/Header';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './pages/homepage.jsx';
import SearchResult from './pages/SearchResult.jsx';
import Signin from './pages/Signin.jsx';
import Hotel from './pages/Hotel.jsx';
import Restaurant from './pages/Restaurant.jsx';
import UserProfile from './pages/UserProfile.jsx';
import SignUp from './pages/SignUp.jsx';
import Card from './components/Card';
import Budget_DD from './components/Budget_DD';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/Search_Result" element={<SearchResult />} />
          <Route path="/Signin" element={<Signin />} />
          <Route path="/Hotel" element={<Hotel />} />
          <Route path="/Restaurant" element={<Restaurant />} />
          <Route path="?user_profile" element={<UserProfile />} />
          <Route path="/sign_up" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
