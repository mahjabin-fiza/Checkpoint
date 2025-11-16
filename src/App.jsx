import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './pages/homepage.jsx';
import SearchResult from './pages/SearchResult.jsx';
import Test from './pages/test.jsx';
import './App.css';
import Signin from './pages/Signin.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/Search_Result" element={<SearchResult />} />
        <Route path="/Signin" element={<Signin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
