import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './pages/homepage.jsx';
import SearchResult from './pages/SearchResult.jsx';
import Test from './pages/test.jsx';
import './App.css';
import Signin from './pages/Signin.jsx';
import Hotel from './pages/Hotel.jsx';
import Restaurant from './pages/Restaurant.jsx';
import UserProfile from './pages/UserProfile.jsx';

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
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
