import Button1 from './Button1.jsx';
import Button2 from './Button2.jsx';
import Signin from '../pages/Signin.jsx';
import { Link } from 'react-router-dom';
import ProfileDropdown from './ProfileDropdown.jsx';
import HotelSearch from './HotelSearch.jsx';

function Header() {
  return (
    <header className="w-full px-14 py-6 bg-white">
      <div className="max-w-8xl mx-auto flex items-center justify-between">
        <Link to="/">
          <h1 className="text-4xl font-bold text-[#4B3A2D]">Checkpoint</h1>
        </Link>

        <div className="flex flex-wrap space-x-1 items-center">
          <Link
            to="/"
            className="px-5 py-3 rounded text-sm font-medium hover:bg-[#D6E9D6] transition duration-300 ease-in-out"
          >
            Home
          </Link>
          <Link
            to="/Restaurant"
            className="px-5 py-3 rounded text-sm font-medium hover:bg-[#D6E9D6] transition duration-300 ease-in-out"
          >
            Restuarant
          </Link>
          <Link
            to="/Hotel"
            className="px-5 py-3 rounded text-sm font-medium hover:bg-[#D6E9D6] transition duration-300 ease-in-out"
          >
            Hotel
          </Link>
          <div className="px-4">
            {/* <Button1 text="Sign In" to="/Signin" /> */}
            <ProfileDropdown />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;